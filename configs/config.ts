const development = {
  host: (): string => "127.0.0.1",
  port: (): string => "4321",
  fullUrl: (): string => "http://api.bk.com",
  db: {
    client: (): string => "pg",
    host: (): string => "127.0.0.1",
    user: (): string => "___",
    password: (): string => "___",
    database: (): string => "___",
  },
  fe: {
    domain: (): string => "fe.com",
    host: (): string => "http://fe.com",
    port: (): string => "5321",
    fullUrl: (): string => "http://fe.com",
  },
};
type EnvConfig = typeof development;
const testing: EnvConfig = {
  host: (): string => "127.0.0.1",
  port: (): string => "4321",
  fullUrl: (): string => "http://api.bk.com",
  db: {
    client: (): string => "pg",
    host: (): string => "127.0.0.1",
    user: (): string => "___",
    password: (): string => "___",
    database: (): string => "___",
  },
  fe: {
    domain: (): string => "fe.com",
    host: (): string => "http://fe.com",
    port: (): string => "5321",
    fullUrl: (): string => "http://fe.com",
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