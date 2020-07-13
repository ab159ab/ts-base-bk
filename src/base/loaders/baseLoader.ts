import { configs, otherConfigs } from "../../../configs/config";

export const appEnv = (process.env.ENV || "testing").trim();
export const appConfigs = otherConfigs;
export const appEnvConfig = configs.getEnvObj(appEnv);
