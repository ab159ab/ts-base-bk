import { config } from "../../../configs/config";

const env = process.env.ENV;
if (env) env.trim();
export const appEnv = env;
export const appEnvConfig = config.getEnvObj(appEnv);
export const port = appEnvConfig.port();
