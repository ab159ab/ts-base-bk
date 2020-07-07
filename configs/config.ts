export const config = {
  getEnvObj: (envString:string):object => {
    if(envString === 'development') return config.development;
    if(envString === 'testing') return config.testing;
    return {};
  },
  development: {
    host: ():string => "127.0.0.1",
    port: ():string => "4321",
    fullUrl: ():string => "http://api.bk.com",
    db: {
      client: ():string => "pg",
      host: ():string => "127.0.0.1",
      user: ():string => "___",
      password: ():string => "___",
      database: ():string => "___",
    },
    fe: {
      domain: ():string => "fe.com",
      host: ():string => "http://fe.com",
      port: ():string => "5321",
      fullUrl: ():string => "http://fe.com",
    },
  },
  testing: {}
};

