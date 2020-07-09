import { QueryBuilder, Transaction } from "knex";
import { getEntityByFKDao } from "../../../../base/dao/entityGetDao";
import DB_TBLS from "../../../shared/DBTBL/TBL";
import { insertEntityDao } from "../../../../base/dao/entityInsertDao";
import { updateEntityByFKDao } from "../../../../base/dao/entityUpdateDao";
import EmailModel from "../../../public/auth/models/EmailModel";
import PersonModel from "../../../public/auth/models/PersonModel";
import PasswordModel from "../../../public/auth/models/PasswordModel";
import LeadStatusModel from "../../../public/auth/models/LeadStatusModel";
import LeadModel from "../../../public/auth/models/LeadModel";

const { LEAD_ID } = DB_TBLS.FOREIGN_KEYS;
const { TABLE: LEAD_TABLE } = DB_TBLS.LEAD;
const { TABLE: LEAD_STATUS_TABLE } = DB_TBLS.LEAD_STATUS;
const {
  TABLE: PERSON_TABLE,
} = DB_TBLS.PERSON;
const { TABLE: EMAIL_TABLE, COLS: { EMAIL: EMAIL_COL } } = DB_TBLS.EMAIL;
const { TABLE: PASSWORD_TABLE } = DB_TBLS.PASSWORD;

export const getUserByEmailDao = (
  trx: Transaction, email: string,
):QueryBuilder<EmailModel> => getEntityByFKDao<EmailModel>(
  trx, EMAIL_TABLE, EMAIL_COL, email,
);

export const getEmailByLeadIdDao = (
  trx: Transaction, leadId: string,
):QueryBuilder => getEntityByFKDao(trx, EMAIL_TABLE, LEAD_ID, leadId);

export const getUserStatusByLeadId = (
  trx: Transaction, leadId: string,
):QueryBuilder => getEntityByFKDao(trx, LEAD_STATUS_TABLE, LEAD_ID, leadId)
  .first();

export const insertLeadDao = <T> (
  trx:Transaction, leadModel:LeadModel,
):Promise<T> => insertEntityDao(trx, LEAD_TABLE, leadModel)
    .then((insertedRow) => insertedRow[0]);

export const insertEmailDao = (
  trx:Transaction, emailModel: EmailModel,
):Promise<EmailModel> => insertEntityDao<EmailModel>(trx, EMAIL_TABLE, emailModel)
  .then((insertedRow) => insertedRow[0]);

export const insertPassDao = (
  trx:Transaction, passwordModel: PasswordModel,
):Promise<PasswordModel> => insertEntityDao<PasswordModel>(trx, PASSWORD_TABLE, passwordModel)
  .then((insertedRow) => insertedRow[0]);

export const insertUserNameDao = (
  trx:Transaction, personModel: PersonModel,
):QueryBuilder => insertEntityDao<PersonModel>(trx, PERSON_TABLE, personModel);

export const insertLeadStatusDao = (
  trx: Transaction, leadStatusModel: LeadStatusModel,
) => insertEntityDao(trx, LEAD_STATUS_TABLE, leadStatusModel);

export const updateUserNameDao = (
  trx:Transaction, personModel: PersonModel,
):QueryBuilder<PersonModel> => updateEntityByFKDao(
  trx, PERSON_TABLE, LEAD_ID, personModel.leadId, personModel,
);
