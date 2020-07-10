import { Transaction } from "knex";
import { appEnv, appEnvConfig } from "../../../../../base/loaders/baseLoader";
import { ENV_TESTING } from "../../../../../base/constants/globalConstants";
import sendEmail from "../../../../../base/service/email/email";
import {
  getUserByEmailDao, getUserStatusByLeadId,
  insertEmailDao,
  insertLeadDao, insertLeadStatusDao,
  insertPassDao, insertUserNameDao, updateUserNameDao, changeRegistrationStatusDao,
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

  if (appEnv !== ENV_TESTING) {
    const emailBody = `<a href='${appEnvConfig.fullUrl()}/verify-account/${leadId}'>Click here to verify your account</a>`;
    sendEmail(emailModel.email, emailBody, () => null, "html");
  }

  return leadId;
};

export const verifyUserAccount = async (trx: Transaction, accountId: string):
  Promise<LeadStatusModel | boolean> => {
  const userStatus: LeadStatusModel = await getUserStatusByLeadId(trx, accountId);
  if (userStatus) {
    if (userStatus.status === "pending") {
      return changeRegistrationStatusDao(
        trx, new LeadStatusModel(userStatus.leadId, "active"),
      ); // accountId, STATUS_ENUM.ACTIVE
    }
  }
  return false;
};
