import { config } from "../../../configs/config";

const env = (process.env.ENV || "").trim();
export const appEnv = env;
export const appConfig = config.getEnvObj(appEnv) as any;
