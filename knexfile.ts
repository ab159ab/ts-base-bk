import { config } from "./configs/config";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const appEnv = process.env.ENV.trim();
const appEnvConfig = config.getEnvObj(appEnv);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const dbConfig = appEnvConfig.db;

export default {
  development: {
    client: dbConfig.client(),
    connection: {
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      charset: "utf8",
    },
    migrations: {
      directory: `${__dirname}/src/base/database/knex/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/base/database/knex/seeds`,
    },
  },
  testing: {
    client: dbConfig.client(),
    connection: {
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      charset: "utf8",
    },
    migrations: {
      directory: `${__dirname}/src/base/database/knex/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/base/database/knex/seeds`,
    },
  },

  /* staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations-old: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations-old: {
      tableName: 'knex_migrations'
    }
  } */

};
