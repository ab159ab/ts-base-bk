const development = {
  host: () => "127.0.0.1",
  port: () => "4321",
  fullUrl: () => "http://api.bk.com",
  db: {
    client: () => "pg",
    host: () => "127.0.0.1",
    user: () => "___",
    password: () => "___",
    database: () => "___",
  },
  fe: {
    domain: () => "fe.com",
    host: () => "http://fe.com",
    port: () => "5321",
    fullUrl: () => "http://fe.com",
  },
};
type EnvConfig = typeof development;
const testing: EnvConfig = {
  host: () => "127.0.0.1",
  port: () => "4321",
  fullUrl: () => "http://api.bk.com",
  db: {
    client: () => "pg",
    host: () => "127.0.0.1",
    user: () => "___",
    password: () => "___",
    database: () => "___",
  },
  fe: {
    domain: () => "fe.com",
    host: () => "http://fe.com",
    port: () => "5321",
    fullUrl: () => "http://fe.com",
  },
};

export const config = {
  getEnvObj: (envString:string): EnvConfig => {
    if (envString === "development") { return development; }
    if (envString === "testing") { return testing; }
    else { throw new Error(`Unexpected envString of ${envString}. Valid values are 'development', 'testing'`); }
  },
};

export const abc = "";