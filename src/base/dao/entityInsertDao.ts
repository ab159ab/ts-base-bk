import { QueryBuilder, Transaction } from "knex";
import { getEntityByFKDao } from "./entityGetDao";
import { updateEntityByFKDao } from "./entityUpdateDao";

export const insertEntityDao = <T> (
  trx: Transaction, tableName: string, objToInsert: T,
):QueryBuilder<T> => trx(tableName).insert(objToInsert).returning("*");

export const insertEntityIfNotExistDao = <T> (
  trx: Transaction,
  tableName: string,
  colNameFromCheck: string,
  colValueToCheck: string,
  objToInsert: T,
):Promise<T> => trx(tableName)
    .select()
    .first()
    .where(colNameFromCheck, colValueToCheck || null)
    .then((row) => row || trx(tableName)
      .insert(objToInsert)
      .returning("*")
      .then((rslt) => rslt[0]));

export const insertOrUpdateByFkDao = async <T> (
  trx: Transaction, tableName: string, fkColName: string,
  fkColVal: string, objToInsertOrUpdate: T,
):Promise<QueryBuilder<T>> => {
  const entity = await getEntityByFKDao<T>(trx, tableName, fkColName, fkColVal);
  if (entity) {
    return updateEntityByFKDao<T>(trx, tableName, fkColName, fkColVal, objToInsertOrUpdate);
  }
  return insertEntityDao<T>(trx, tableName, objToInsertOrUpdate);
};
