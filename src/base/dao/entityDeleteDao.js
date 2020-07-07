const delEntityByIdDao = (trx, tableName, id) => trx(tableName)
  .where("id", id).del();

export default delEntityByIdDao;
