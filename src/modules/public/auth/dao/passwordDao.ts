import { Transaction } from "knex";
import DB_TBLS from "../../../shared/DBTBL/TBL";
import { getEntityByColNameDao, getEntityByIdDao } from "../../../../base/dao/entityGetDao";
import delEntityByIdDao from "../../../../base/dao/entityDeleteDao";
import { insertEntityDao } from "../../../../base/dao/entityInsertDao";

const { LEAD_ID } = DB_TBLS.FOREIGN_KEYS;
const {
  TABLE: FORGOT_PWD_TBL,
  COLS: { ID: FORGOT_PWD_ID_COL, Token_Expiry_DATE: TOKEN_EXP_COL },
} = DB_TBLS.FORGOT_PASSWORD;
const { TABLE: PASSWORD_TABLE, COLS: { HASHED_PASSWORD: HASH_PWD_COL } } = DB_TBLS.PASSWORD;

export const getDetailsByForgetPassTokenDao = (trx: Transaction, token: string) => getEntityByIdDao(
  trx, token, FORGOT_PWD_TBL,
);

export const changePasswordDao = (trx, leadId, newPass) => trx(PASSWORD_TABLE)
  .update(HASH_PWD_COL, newPass)
  .where(LEAD_ID, leadId)
  .returning("*");

export const deleteForgotPassToken = (trx, token) => delEntityByIdDao(trx, FORGOT_PWD_TBL, token);

export const getPasswordByLeadIdDao = (trx, leadId) => getEntityByColNameDao(trx,
  PASSWORD_TABLE, LEAD_ID, leadId);

export const insertPasswordResetTokenDao = (trx, leadId,
  tokenExpirationDate) => insertEntityDao(trx, FORGOT_PWD_TBL,
  {
    [LEAD_ID]: leadId, [TOKEN_EXP_COL]: tokenExpirationDate,
  }).then((row) => row[0][FORGOT_PWD_ID_COL]);
