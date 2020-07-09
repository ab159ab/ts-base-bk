import { UNAUTHORIZED } from "http-status-codes";

import { Request, Response, NextFunction } from "express";
import { otherConfigs } from "../../../../../configs/config";
import { getSessionData, hasSession } from "../service/redis/session";

const authMW = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const hasUserSession = await hasSession(req.cookies[otherConfigs.session.sessionKeyName()]);
  if (hasUserSession) {
    res.locals.user = JSON.parse(
      await getSessionData(req.cookies[otherConfigs.session.sessionKeyName()]),
    );
    next();
  } else res.status(UNAUTHORIZED).json({ message: "Authentication denied" });
};

export default authMW;
