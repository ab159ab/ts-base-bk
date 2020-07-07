import { QueryBuilder, Transaction } from "knex";
import { getEntitiesByFKDao, getEntityByFKDao, getEntityByIdDao } from "../../../../base/dao/entityGetDao";
import DB_TBLS from "../../../shared/DBTBL/TBL";
import { insertEntityDao } from "../../../../base/dao/entityInsertDao";
import { updateEntityByFKDao } from "../../../../base/dao/entityUpdateDao";

const { LEAD_ID } = DB_TBLS.FOREIGN_KEYS;
const { TABLE: LEAD_TABLE, COLS: { TYPE: LEAD_TYPE_COL } } = DB_TBLS.LEAD;
const { TABLE: LEAD_STATUS_TABLE, COLS: { STATUS: LEAD_STATUS_COL } } = DB_TBLS.LEAD_STATUS;
const {
  TABLE: PERSON_TABLE,
  COLS: { FIRST_NAME: FNAME_COL, LAST_NAME: LNAME_COL },
} = DB_TBLS.PERSON;
const { TABLE: EMAIL_TABLE, COLS: { EMAIL: EMAIL_COL } } = DB_TBLS.EMAIL;
const { TABLE: PASSWORD_TABLE, COLS: { HASHED_PASSWORD: HASH_PWD_COL } } = DB_TBLS.PASSWORD;

export const getUserByEmailDao = (
  trx: Transaction, email: string,
):QueryBuilder => getEntityByFKDao(trx, EMAIL_TABLE, EMAIL_COL, email);

export const getUserById = (
  trx: Transaction, userId: string,
):QueryBuilder => getEntityByIdDao(trx, userId, PERSON_TABLE);

export const getEmailByLeadIdDao = (
  trx: Transaction, leadId: string,
):QueryBuilder => getEntityByFKDao(trx, EMAIL_TABLE, LEAD_ID, leadId);

export const getEmailListByUserLeadId = (
  trx:Transaction, leadId:string,
):QueryBuilder => getEntitiesByFKDao(trx,
  EMAIL_TABLE, LEAD_ID, leadId);

export const getUserStatusByLeadId = (
  trx: Transaction, leadId: string,
):QueryBuilder => getEntityByFKDao(trx, LEAD_STATUS_TABLE, LEAD_ID, leadId)
  .first();

export const insertLeadDao = (
  trx:Transaction, type:string,
):QueryBuilder => insertEntityDao(trx, LEAD_TABLE,
  { [LEAD_TYPE_COL]: type }).then((insertedRow) => insertedRow[0]);

export const insertEmailDao = (
  trx:Transaction, leadId:string, email:string,
):QueryBuilder => insertEntityDao(trx, EMAIL_TABLE,
  { [LEAD_ID]: leadId, [EMAIL_COL]: email })
  .then((insertedRow) => insertedRow[0]);

export const insertPassDao = (
  trx:Transaction, leadId:string, hashedPass:string,
):QueryBuilder => insertEntityDao(trx,
  PASSWORD_TABLE, { [LEAD_ID]: leadId, [HASH_PWD_COL]: hashedPass })
  .then((insertedRow) => insertedRow[0]);

export const insertUserNameDao = (
  trx:Transaction, leadId:string, fname:string, lname:string,
):QueryBuilder => insertEntityDao(trx,
  PERSON_TABLE, { [LEAD_ID]: leadId, [FNAME_COL]: fname, [LNAME_COL]: lname });

export const insertLeadStatusDao = (
  trx: Transaction, leadId:string, status:string,
) => insertEntityDao(trx,
  LEAD_STATUS_TABLE, { [LEAD_ID]: leadId, [LEAD_STATUS_COL]: status });

export const changeRegistrationStatusDao = (
  trx:Transaction, leadId:string, status:string,
):QueryBuilder => updateEntityByFKDao(trx,
  LEAD_STATUS_TABLE, LEAD_ID, leadId, { [LEAD_STATUS_COL]: status });

export const updateUserNameDao = (
  trx:Transaction, leadId:string, fname:string, lname:string,
):QueryBuilder => updateEntityByFKDao(trx,
  PERSON_TABLE, LEAD_ID, leadId, { [FNAME_COL]: fname, [LNAME_COL]: lname });
