import "regenerator-runtime/runtime";
import "core-js/stable";
import { OK } from "http-status-codes";
import app from "../preApp";

import { appEnv, appEnvConfig } from "../base/loaders/baseLoader";
import { getRequest } from "./utils/testUtils";

import knex from "../base/database/knex/knex";

console.log("--------", appEnv);
app.listen(appEnvConfig.port(), () => {
  console.log(`app is ready on port: ${appEnvConfig.port()}`);
});

export default async () => {
  await knex.migrate.rollback();
  console.log("[Rolled back all migrations]");

  await knex.migrate.latest();
  console.log("[Roll to latest migrations]");

  for (; ;) {
    // eslint-disable-next-line no-await-in-loop
    const resp = await getRequest("/testing");
    // console.log(resp);
    // console.log(await resp.text(), 'resp');
    if (resp.status === OK) break;
  }
};
