import { QueryBuilder, Transaction } from "knex";
import { getEntityByFKDao } from "./entityGetDao";
import { updateEntityByFKDao } from "./entityUpdateDao";

export const insertEntityDao = <T> (
  trx: Transaction, tableName: string, objToInsert: T,
):QueryBuilder<T> => trx(tableName).insert(objToInsert).returning("*");

export const insertEntityIfNotExistDao = (trx: Transaction, tableName: string,
  colNameFromCheck: string, colValueToCheck: string, objToInsert: any) => trx(tableName)
  .select()
  .first()
  .where(colNameFromCheck, colValueToCheck || null)
  .then((row) => row || trx(tableName)
    .insert(objToInsert)
    .returning("*")
    .then((rslt) => rslt[0]));

export const insertOrUpdateByFkDao = async (
  trx: Transaction, tableName: string, fkColName: string,
  fkColVal: string, objToInsertOrUpdate: any,
):Promise<QueryBuilder> => {
  const entity = await getEntityByFKDao(trx, tableName, fkColName, fkColVal);
  if (entity) {
    return updateEntityByFKDao(trx, tableName, fkColName, fkColVal, objToInsertOrUpdate);
  }
  return insertEntityDao(trx, tableName, objToInsertOrUpdate);
};
