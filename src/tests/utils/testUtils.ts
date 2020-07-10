import fetch, { Response } from "node-fetch";
import { appEnvConfig } from "../../base/loaders/baseLoader";

export const postRequest = <T> (route: string, requestBody: T,
  headers = {}):Promise<Response> => fetch(`${appEnvConfig.fullUrl()}${route}`, {
    headers: { "Content-Type": "application/json", origin: appEnvConfig.fullUrl(), ...headers },
    method: "POST",
    body: JSON.stringify(requestBody),
    timeout: 0,
  });

export const getRequest = (
  route: string, headers = {},
):Promise<Response> => fetch(`${appEnvConfig.fullUrl()}${route}`, {
  headers: { origin: appEnvConfig.fullUrl(), ...headers },
});

export const delay = (seconds: number): Promise<number> => new Promise(
  (res) => setTimeout(res, seconds * 1000),
);
