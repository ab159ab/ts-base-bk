import { UNAUTHORIZED } from "http-status-codes";

import { Request, Response, NextFunction } from "express";
import { config } from "../../../../../configs/config";
import { getSessionData, hasSession } from "../service/redis/session";
import { appConfig } from "../../../../base/loaders/baseLoader";

const authMW = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const hasUserSession = await hasSession(req.cookies[appConfig.session.sessionKeyName]);
  if (hasUserSession) {
    res.locals.user = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await getSessionData(req.cookies[config.session.sessionKeyName]),
    );
    next();
  } else res.status(UNAUTHORIZED).json({ message: "Authentication denied" });
};

export default authMW;

/*
const hasUserSession = await hasSession(req.cookies[appConfigs.session.sessionKeyName]);
if (allowOnlyIfAuthenticated) {
  if (hasUserSession) {
    res.locals.user = JSON.parse(
        await getSessionData(req.cookies[configs.session.sessionKeyName]),
    );

    next();
  } else res.status(UNAUTHORIZED).json(getMsgObjByI18nKey('msg.auth_denied'));
} else if (!allowOnlyIfAuthenticated) {
  if (!hasUserSession) next();
  else res.status(UNAUTHORIZED).json(getMsgObjByI18nKey('msg.logged_in_user_access_denied'));
} */
