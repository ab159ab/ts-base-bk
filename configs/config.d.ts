interface Iconfig {
  getEnvObj:Function;
}

interface IgetEnvObj {
  host:Function;
  port:Function;
  fullUrl:Function;
  db: Idb;
}

interface Idb {
  client:Function;
  host:Function;
  user:Function;
  password:Function;
  database:Function;
}
