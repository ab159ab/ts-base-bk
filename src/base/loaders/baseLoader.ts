import { config } from "../../../configs/config";

export const appEnv = (process.env.ENV || "").trim();
export const appConfig = config.getEnvObj(appEnv) as any;
