export const updateEntityByIdDao = (trx, tableName, id, objToUpdate) => trx(tableName)
  .update(objToUpdate)
  .where("id", id)
  .returning("*");

export const updateEntityByFKDao = (
  trx, tableName, fkColName, fkValue, objToUpdate,
) => trx(tableName)
  .update(objToUpdate)
  .where(fkColName, fkValue);
