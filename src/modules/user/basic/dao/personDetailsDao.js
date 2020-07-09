const DB_TBLS = require("../../../shared/DBTBL/TBL");

const { LEAD_ID } = DB_TBLS.FOREIGN_KEYS;
const { TABLE: PERSON_TABLE } = DB_TBLS.PERSON;

const getPersonDetailsByLeadIdDao = (trx, leadId) => trx(PERSON_TABLE)
  .where(LEAD_ID, leadId)
  .first();

export default getPersonDetailsByLeadIdDao;
