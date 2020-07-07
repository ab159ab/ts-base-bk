import configs from "../../../configs/config.js";

const env = process.env.ENV;
if (env) env.trim();
export const appEnv = env;
export const appEnvConfig = configs.default.getEnvObj(appEnv);
