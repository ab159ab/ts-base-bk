import { config } from "../../../configs/config";

// @ts-ignore
const env = (process.env.ENV || "").trim();
export const appEnv = env;
export const appConfig = config;
export const appEnvConfig = config.getEnvObj(appEnv) as any;
