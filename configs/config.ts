// eslint-disable-next-line import/prefer-default-export
export const config = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  getEnvObj: (envString:string):object => {
    if (envString === "development") return config.development;
    if (envString === "testing") return config.testing;
    return {};
  },
  development: {
    host: ():string => "127.0.0.1",
    port: ():string => "4321",
    fullUrl: ():string => "http://api.bk.com",
    db: {
      client: ():string => "pg",
      host: ():string => "127.0.0.1",
      user: ():string => "postgres",
      password: ():string => "123456",
      database: ():string => "ts-db",
    },
    fe: {
      domain: ():string => "fe.com",
      host: ():string => "http://fe.com",
      port: ():string => "5321",
      fullUrl: ():string => "http://fe.com",
    },
  },
  testing: {},
  auth: {
    loginExpireTimeInMinutes: ():number => 30,
    resetPasswordExpireTimeInMinutes: ():number => 100,
  },
  session: {
    sessionKeyName: ():string => "lead-gen-bk-cookie",
  },
  emailService: {
    transport: (): string => "mailgun",
    mailgun: {
      apiKey: (): string => "6745a1dc44b3bd7b8e24e118d9ceae4b-46ac6b00-c784b5ab",
      domain: (): string => "sandboxe7a44227e6f64e599fe5a80aa8262fde.mailgun.org",
      email: {
        from: (): string => "leadGen@test.com",
        subject: (): string => "Hi",
        replyTo: (): string => "whoever@gmail.com",
      },
    },
  },
};
