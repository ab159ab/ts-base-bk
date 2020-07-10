const development = {
  host: () => "127.0.0.1",
  port: () => "4321",
  fullUrl: () => "http://api.skeleton.com",
  allowedOrigins: () => ["http://skeleton.com", "http://testapi.skeleton.com"],
  db: {
    client: () => "pg",
    host: () => "127.0.0.1",
    user: () => "postgres",
    password: () => "123456",
    database: () => "skeleton",
  },
  fe: {
    domain: () => "http://127.0.0.1:5321",
    host: () => "http://fe.com",
    port: () => "5321",
    fullUrl: () => "http://fe.com",
  },
};
type EnvConfig = typeof development;
const testing: EnvConfig = {
  host: () => "127.0.0.1",
  port: () => "4322",
  fullUrl: () => "http://testapi.skeleton.com",
  allowedOrigins: () => ["http://skeleton.com", "http://testapi.skeleton.com"],
  db: {
    client: () => "pg",
    host: () => "127.0.0.1",
    user: () => "postgres",
    password: () => "123456",
    database: () => "skeleton-test",
  },
  fe: {
    domain: () => "http://127.0.0.1:5321",
    host: () => "http://fe.com",
    port: () => "5321",
    fullUrl: () => "http://fe.com",
  },
};

export const otherConfigs = {
  auth: {
    loginExpireTimeInMinutes: (): number => 30,
    resetPasswordExpireTimeInMinutes: (): number => 100,
  },
  session: {
    sessionKeyName: ():string => "ts-bk-cookie",
  },
  emailService: {
    transport: ():string => "mailgun",
    mailgun: {
      apiKey: ():string => "f62c3af5787985c4178bb7f9ff58b6ad-87c34c41-bb176fc8",
      domain: ():string => "sandbox010719cbb42248e4ae2ef17bca056cc9.mailgun.org",
      email: {
        from: ():string => "ts@test.com",
        subject: ():string => "Hi",
        replyTo: ():string => "whoever@gmail.com",
      },
    },
  },
  jest: {
    timeoutInMs: ():number => 3000000,
    test: {
      auth: {
        testFirstName: ():string => "test first name",
        testLastName: ():string => "test last name",
        testEmail: ():string => "test@test.com",
        testPassword: ():string => "123456",
      },
    },
  },
};

export const configs = {
  getEnvObj: (envString:string): EnvConfig => {
    if (envString === "development") { return development; }
    if (envString === "testing") { return testing; }
    throw new Error(`Unexpected envString of ${envString}. Valid values are 'development', 'testing'`);
  },
};
