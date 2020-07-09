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
    directory: "./base/database/knex/migrations",
  },
  seeds: {
    directory: "./base/database/knex/seeds",
  },
};

module.exports = knexConfigs;
