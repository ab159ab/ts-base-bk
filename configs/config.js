const config = {
  getEnvObj: (envString) => {
    if(envString === 'development') return config.development;
    if(envString === 'testing') return config.testing;
  },
  development: {
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
  },
  testing: {}
};

exports.default = config;
