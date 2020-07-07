import { getEntityByFKDao } from "./entityGetDao";
import { updateEntityByFKDao } from "./entityUpdateDao";

export const insertEntityDao = (trx, tableName, value) => trx(tableName)
  .insert(value).returning("*");

export const insertEntityIfNotExistDao = (trx, tableName,
  colNameFromCheck, colValueToCheck, objToInsert) => trx(tableName)
  .select()
  .first()
  .where(colNameFromCheck, colValueToCheck || null)
  .then((row) => row || trx(tableName)
    .insert(objToInsert)
    .returning("*")
    .then((rslt) => rslt[0]));

export const insertOrUpdateByFkDao = async (
  trx, tableName, fkColName, fkColVal, objToInsertOrUpdate,
) => {
  const entity = await getEntityByFKDao(trx, tableName, fkColName, fkColVal);
  if (entity) {
    return updateEntityByFKDao(trx, tableName, fkColName, fkColVal, objToInsertOrUpdate);
  }
  return insertEntityDao(trx, tableName, objToInsertOrUpdate);
};
