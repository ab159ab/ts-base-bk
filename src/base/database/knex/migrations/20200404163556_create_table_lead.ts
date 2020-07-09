import { CreateTableBuilder, Transaction } from "knex";
import DB_TBLS from "../../../../modules/shared/DBTBL/TBL";

const { TABLE, COLS, ENUM } = DB_TBLS.LEAD;

exports.up = (trx: Transaction) => trx.schema
  .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
  .createTable(TABLE, (table: CreateTableBuilder) => {
    table.uuid(COLS.ID).primary().defaultTo(trx.raw("uuid_generate_v4()")).notNullable();
    table.enu(COLS.TYPE, [ENUM.TYPE.BUSINESS, ENUM.TYPE.PERSON, ENUM.TYPE.CANDIDATE]);
    table.timestamps(true, true);
  });

exports.down = (trx: Transaction) => trx.schema.dropTable(TABLE);
