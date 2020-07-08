import { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } from "http-status-codes";
import { Request, Response } from "express";
import { Transaction } from "knex";
import { AUTH_USER_EXIST } from "../constants/authConstants";
import { registerUser } from "../service/auth/register";
import { appEnv, appEnvConfig } from "../../../../base/loaders/baseLoader";
import { ENV_TESTING } from "../../../../base/constants/globalConstants";
import { setUserSession } from "../service/redis/session";
import { otherConfigs } from "../../../../../configs/config";
import knex from "../../../../base/database/knex/knex";

const COOKIE_DOMAIN_SCOPE = `.${appEnvConfig.fe.domain}`;
const SESSION_KEY_NAME = otherConfigs.session.sessionKeyName();

export const getDefaultCookieConfig = (expirationDate: Date):{
  domain: string, path: string, expires: Date
} => ({
  domain: COOKIE_DOMAIN_SCOPE,
  path: "/",
  expires: expirationDate,
});

// eslint-disable-next-line import/prefer-default-export
export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    await knex.transaction(async (trx: Transaction) => {
      const leadIdOrResult = await registerUser(trx, req.body);
      if (!leadIdOrResult) res.status(UNPROCESSABLE_ENTITY).json({ message: "There is an error while registering" });
      else if (leadIdOrResult === AUTH_USER_EXIST) {
        res.status(UNPROCESSABLE_ENTITY).json({ message: "The user already exist" });
      } else {
        if (appEnv !== ENV_TESTING) {
          setUserSession(leadIdOrResult, otherConfigs.auth.loginExpireTimeInMinutes() * 60000,
            { leadId: leadIdOrResult });

          const cookieExpireDate = new Date(
            Date.now() + (otherConfigs.auth.loginExpireTimeInMinutes() * 60000),
          );

          res.cookie(SESSION_KEY_NAME, leadIdOrResult, getDefaultCookieConfig(cookieExpireDate));
        }
        res.json({ message: "Your account has been created successfully" });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(INTERNAL_SERVER_ERROR).json({ message: "There is a server error" });
  }
};
