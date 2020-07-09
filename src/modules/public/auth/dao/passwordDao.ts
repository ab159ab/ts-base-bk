import { QueryBuilder, Transaction } from "knex";
import DB_TBLS from "../../../shared/DBTBL/TBL";
import { getEntityByColNameDao, getEntityByIdDao } from "../../../../base/dao/entityGetDao";
import delEntityByIdDao from "../../../../base/dao/entityDeleteDao";
import { insertEntityDao } from "../../../../base/dao/entityInsertDao";
import ForgotPwdModel from "../models/ForgotPwdModel";
import PasswordModel from "../models/PasswordModel";

const { LEAD_ID } = DB_TBLS.FOREIGN_KEYS;
const { TABLE: FORGOT_PWD_TBL } = DB_TBLS.FORGOT_PASSWORD;
const { TABLE: PASSWORD_TABLE } = DB_TBLS.PASSWORD;

export const getDetailsByForgetPassTokenDao = (
  trx: Transaction, token: string,
):QueryBuilder => getEntityByIdDao(
  trx, token, FORGOT_PWD_TBL,
);

export const changePasswordDao = (
  trx: Transaction, passwordModel: PasswordModel,
):QueryBuilder => trx(PASSWORD_TABLE)
  .update(passwordModel)
  .where(LEAD_ID, passwordModel.leadId)
  .returning("*");

export const deleteForgotPassToken = (
  trx: Transaction, token: string,
):QueryBuilder => delEntityByIdDao(trx, FORGOT_PWD_TBL, token);

export const getPasswordByLeadIdDao = (
  trx: Transaction, leadId: string,
):QueryBuilder => getEntityByColNameDao(trx, PASSWORD_TABLE, LEAD_ID, leadId);

export const insertPasswordResetTokenDao = (
  trx: Transaction, forgotPwdModel: ForgotPwdModel,
):Promise<string | undefined> => insertEntityDao<ForgotPwdModel>(
  trx, FORGOT_PWD_TBL, forgotPwdModel,
).then((row: ForgotPwdModel[]) => row[0].id);
