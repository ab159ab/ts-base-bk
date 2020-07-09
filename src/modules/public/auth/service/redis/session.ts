import { getAsyncRedisClient, getRedisClient } from "./redis";

export const setUserSession = (
  sessionKey: string, expirationTime: number, data: { leadId: string },
):void => {
  getRedisClient().setex(sessionKey, expirationTime, JSON.stringify(data));
};

export const getSessionData = (sessionId:string): string => getAsyncRedisClient()(sessionId);

export const hasSession = (sessionId:string):boolean | string => sessionId
    && getSessionData(sessionId) !== null;

export const deleteUserSession = (sessionId: string):boolean => getRedisClient().del(sessionId);
