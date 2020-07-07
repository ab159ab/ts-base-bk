import utils from "util";
import redis, { RedisClient } from "redis";

let redisClient;

export const initRedisClient = (): RedisClient => {
  redisClient = redis.createClient();
  redisClient.on("connect", () => console.error("redis client connected"));
  redisClient.on("error", (err) => console.error(err));
  return redisClient;
};

export const getRedisClient = (): RedisClient => {
  if (!redisClient) initRedisClient();
  return redisClient;
};

export const getAsyncRedisClient = ():any => utils.promisify(getRedisClient().get)
  .bind(getRedisClient());
