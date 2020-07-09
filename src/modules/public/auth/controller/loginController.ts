import { Transaction } from "knex";
import { Request, Response } from "express";
import { UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR } from "http-status-codes";
import { appConfigs, appEnvConfig, appEnv } from "../../../../base/loaders/baseLoader";
import { ENV_TESTING } from "../../../../base/constants/globalConstants";
import knex from "../../../../base/database/knex/knex";
import loginUser from "../service/auth/login";
import { AUTH_STATUS_BLOCKED } from "../constants/authConstants";
import { setUserSession, hasSession, deleteUserSession } from "../service/redis/session";

const SESSION_KEY_NAME = appConfigs.session.sessionKeyName();
const COOKIE_DOMAIN_SCOPE = `.${appEnvConfig.fe.domain}`;

export const getDefaultCookieConfig = (expirationDate: Date):{
  domain: string, path: string, expires: Date
} => ({
  domain: COOKIE_DOMAIN_SCOPE,
  path: "/",
  expires: expirationDate,
});

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    await knex.transaction(async (trx: Transaction) => {
      const leadIdOrResult = await loginUser(trx, req.body.email, req.body.password);
      if (!leadIdOrResult) {
        res.status(UNPROCESSABLE_ENTITY).json({ message: "The user does not exist" });
      } else if (leadIdOrResult === AUTH_STATUS_BLOCKED) res.json({ message: "You have been blocked by the Admin" });
      else {
        setUserSession(leadIdOrResult, appConfigs.auth.loginExpireTimeInMinutes() * 60000,
          { leadId: leadIdOrResult });

        const cookieExpireDate = new Date(
          Date.now() + (appConfigs.auth.loginExpireTimeInMinutes() * 60000),
        );

        if (appEnv === ENV_TESTING) res.set(SESSION_KEY_NAME, leadIdOrResult);
        res.cookie(SESSION_KEY_NAME, leadIdOrResult, getDefaultCookieConfig(cookieExpireDate));
        res.json({ message: "You have been logged-in successfully" });
      }
    });
  } catch (e) {
    console.error(e);
    res.status(INTERNAL_SERVER_ERROR).json({ message: "There is a server error" });
  }
};

export const logoutController = async (req: Request, res: Response): Promise<void> => {
  try {
    if (await hasSession(req.cookies[SESSION_KEY_NAME])) {
      await deleteUserSession(req.cookies[SESSION_KEY_NAME]);
      res.cookie(SESSION_KEY_NAME, "", getDefaultCookieConfig(new Date(Date.now())));
    }
    res.json({ message: "logged-out successfully" });
  } catch (e) {
    console.error(e);
    res.status(INTERNAL_SERVER_ERROR).json({ message: "There is a server error" });
  }
};
