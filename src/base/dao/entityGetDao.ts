import { QueryBuilder, Transaction } from "knex";

export const getEntitiesDao = (
  trx: Transaction, tableName: string,
):QueryBuilder => trx(tableName);

export const getEntityByIdDao = (
  trx: Transaction, id: string, tableName: string,
):QueryBuilder => trx(tableName)
  .where("id", id).first();

export const getEntitiesByFKDao = (
  trx: Transaction, tableName: string, fkColName: string, value: string,
):QueryBuilder => trx(tableName)
  .where(fkColName, value);

export const getEntityByFKDao = (
  trx: Transaction, tableName: string, fkColName: string, value: string,
):QueryBuilder => trx(tableName)
  .where(fkColName, value).first();

export const getEntityByColNameDao = (
  trx: Transaction, tableName: string, colName: string, colValue: string,
):QueryBuilder => trx(tableName)
  .where(colName, colValue)
  .first();
