import { CreateTableBuilder, Transaction } from "knex";
import DB_TBLS from "../../../../modules/shared/DBTBL/TBL";

const { TABLE, COLS } = DB_TBLS.PERSON;

exports.up = (trx: Transaction) => trx.schema
  .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
  .createTable(TABLE, (table: CreateTableBuilder) => {
    table.uuid(COLS.ID).primary().defaultTo(trx.raw("uuid_generate_v4()")).notNullable();
    table.uuid(COLS.LEAD_ID).unique().references(DB_TBLS.LEAD.COLS.ID).inTable(DB_TBLS.LEAD.TABLE);
    table.string(COLS.FIRST_NAME);
    table.string(COLS.LAST_NAME);
    table.text(COLS.SUMMARY);
    table.timestamps(true, true);
  });

exports.down = (trx: Transaction) => trx.schema.dropTable(TABLE);
