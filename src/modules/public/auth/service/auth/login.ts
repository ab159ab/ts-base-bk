import { Transaction } from "knex";
import { getUserByEmailDao, getUserStatusByLeadId } from "../../../../user/basic/dao/userDao";
import { isPasswordMatchByLeadId } from "./password";
import EmailModel from "../../models/EmailModel";
import LeadStatusModel from "../../models/LeadStatusModel";

const loginUser = async (trx: Transaction, email: string, pass: string): Promise<string | null> => {
  const user: EmailModel = await getUserByEmailDao(trx, email);

  if (user && await isPasswordMatchByLeadId(trx, user.leadId, pass)) {
    const leadStatusModel: LeadStatusModel = await getUserStatusByLeadId(trx, user.leadId);
    if (leadStatusModel.status === "blocked") return leadStatusModel.status;
    return user.leadId;
  }

  return null;
};

export default loginUser;
