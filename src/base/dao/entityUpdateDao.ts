import { QueryBuilder, Transaction } from "knex";

export const updateEntityByIdDao = <T> (
  trx: Transaction, tableName: string, id: string, objToUpdate: T,
):QueryBuilder<T> => trx(tableName)
    .update(objToUpdate)
    .where("id", id)
    .returning("*");

export const updateEntityByFKDao = <T> (
  trx: Transaction, tableName: string, fkColName: string, fkValue: string, objToUpdate: T,
):QueryBuilder<T> => trx(tableName).update(objToUpdate).where(fkColName, fkValue);
