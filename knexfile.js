import configs from "./configs/config";

const appEnv = process.env.ENV.trim();
const appEnvConfig = configs.getEnvObj();
const dbConfig = appEnvConfig.db;

module.exports = {
  development: {
    client: dbConfig.client,
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
    client: dbConfig.client,
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
