import { appEnvConfig } from "./base/loaders/baseLoader";

const dbConfig = appEnvConfig.db;

const knexConfigs = {
  client: dbConfig.client(),
  connection: {
    host: dbConfig.host(),
    user: dbConfig.user(),
    password: dbConfig.password(),
    database: dbConfig.database(),
    charset: "utf8",
  },
  migrations: {
    directory: `${__dirname}/base/database/knex/migrations`,
  },
  seeds: {
    directory: `${__dirname}/base/database/knex/migrations`,
  },
};

module.exports = knexConfigs;
