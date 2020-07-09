import { Transaction } from "knex";
import { getPasswordByLeadIdDao } from "../../dao/passwordDao";
import DbTBLS from "../../../../shared/DBTBL/TBL";

import { bcryptCompare } from "../bcrypt";

// eslint-disable-next-line import/prefer-default-export
export const isPasswordMatchByLeadId = async (
  trx: Transaction, leadId: string, password: string,
): Promise<boolean> => {
  const userEncryptedPassword = await getPasswordByLeadIdDao(trx, leadId);
  if (password) {
    return bcryptCompare(password, userEncryptedPassword[DbTBLS.PASSWORD.COLS.HASHED_PASSWORD]);
  }
  return false;
};
