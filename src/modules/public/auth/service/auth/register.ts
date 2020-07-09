import { Transaction } from "knex";
import {
  getUserByEmailDao,
  insertEmailDao,
  insertLeadDao, insertLeadStatusDao,
  insertPassDao, insertUserNameDao, updateUserNameDao,
} from "../../../../user/basic/dao/userDao";
import { AUTH_USER_EXIST } from "../../constants/authConstants";
import { bcryptHash } from "../bcrypt";
import { getPasswordByLeadIdDao } from "../../dao/passwordDao";
import PersonModel from "../../models/PersonModel";
import EmailModel from "../../models/EmailModel";
import PasswordModel from "../../models/PasswordModel";
import LeadStatusModel from "../../models/LeadStatusModel";
import LeadModel from "../../models/LeadModel";

interface IUser { firstName: string, lastName: string, email: string, password: string, }

// eslint-disable-next-line import/prefer-default-export
export const registerUser = async (
  trx: Transaction, userObj: IUser,
): Promise<string> => {
  const existingEmailRow: EmailModel = await getUserByEmailDao(trx, userObj.email);
  if (existingEmailRow && await getPasswordByLeadIdDao(trx, existingEmailRow.leadId)) {
    return AUTH_USER_EXIST;
  }

  const leadId: string = existingEmailRow
    ? existingEmailRow.leadId
    : (await insertLeadDao<LeadModel>(trx, new LeadModel("person"))).id || "";

  const personModel = new PersonModel(leadId, userObj.firstName, userObj.lastName);
  const passwordModel = new PasswordModel(await bcryptHash(userObj.password), leadId);
  const leadStatusModel = new LeadStatusModel(leadId, "pending");
  const emailModel = new EmailModel(userObj.email, leadId);

  if (!existingEmailRow) {
    await Promise.all([
      insertEmailDao(trx, emailModel),
      insertUserNameDao(trx, personModel),
    ]);
  } else {
    await updateUserNameDao(trx, personModel);
  }

  await Promise.all([
    insertPassDao(trx, passwordModel),
    insertLeadStatusDao(trx, leadStatusModel),
  ]);

  return leadId;
};

// if (appEnv !== ENV_TESTING) {
//   // const emailBody = `${appEnvConfig.fullUrl}${AUTH_ROUTE_VERIFY_ACCOUNT}/${leadId}`;
//   // sendEmail(emailModel.email, emailBody, () => null, "html");
// }
