import { Transaction } from "knex";
import {
  getUserByEmailDao,
  insertEmailDao,
  insertLeadDao, insertLeadStatusDao,
  insertPassDao, insertUserNameDao, updateUserNameDao,
} from "../../../../user/basic/dao/userDao";
import DbTBLS from "../../../../shared/DBTBL/TBL";
import { AUTH_USER_EXIST } from "../../constants/authConstants";
import { sendEmail } from "../../../../../base/service/email/email";
import { bcryptHash } from "../bcrypt";
import { appEnv, appEnvConfig } from "../../../../../base/loaders/baseLoader";
import { ENV_TESTING } from "../../../../../base/constants/globalConstants";
import { getPasswordByLeadIdDao } from "../../dao/passwordDao";

const AUTH_ROUTE_VERIFY_ACCOUNT = "/verify-account";
const { ENUM: { STATUS: STATUS_ENUM } } = DbTBLS.LEAD_STATUS;
const { COLS: { FIRST_NAME, LAST_NAME } } = DbTBLS.PERSON;
const { COLS: { EMAIL } } = DbTBLS.EMAIL;
const { ENUM: { TYPE: { PERSON } } } = DbTBLS.LEAD;
const { LEAD_ID } = DbTBLS.FOREIGN_KEYS;

interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

// eslint-disable-next-line import/prefer-default-export
export const registerUser = async (
  trx: Transaction, userObj: IUser,
): Promise<string> => {
  let leadId = ""; // TODO: converted from null to string, check here if any error

  const existingEmailRow = await getUserByEmailDao(trx, userObj[EMAIL]);
  if (existingEmailRow && await getPasswordByLeadIdDao(trx, existingEmailRow[LEAD_ID])) {
    return AUTH_USER_EXIST;
  }

  if (!existingEmailRow) {
    const lead = await insertLeadDao(trx, PERSON);
    leadId = lead.id;
    await Promise.all([
      insertEmailDao(trx, leadId, userObj[EMAIL]),
      insertUserNameDao(trx, leadId, userObj[FIRST_NAME], userObj[LAST_NAME]),
    ]);
  } else {
    leadId = existingEmailRow[LEAD_ID];
    await updateUserNameDao(trx, leadId, userObj[FIRST_NAME], userObj[LAST_NAME]);
  }

  await Promise.all([
    insertPassDao(trx, leadId, await bcryptHash(userObj.password)),
    insertLeadStatusDao(trx, leadId, STATUS_ENUM.PENDING),
  ]);

  if (appEnv !== ENV_TESTING) {
    const emailBody = `${appEnvConfig.fullUrl}${AUTH_ROUTE_VERIFY_ACCOUNT}/${leadId}`;
    sendEmail(userObj[DbTBLS.EMAIL.COLS.EMAIL], emailBody, () => null, "html");
  }

  return leadId;
};
