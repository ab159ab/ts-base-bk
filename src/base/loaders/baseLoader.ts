import { config } from "../../../configs/config";

const env = process.env.ENV || "";
if (env) env.trim();
export const appEnv = env;
export const appConfig = config.getEnvObj(appEnv) as any;
