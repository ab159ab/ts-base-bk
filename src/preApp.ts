import "regenerator-runtime/runtime";
import "core-js/stable";
import express, { Application } from "express";
import routes from "./modules/public/auth/routes/authRoutes";
// import knex from "./base/database/knex/knex";

const expressApp: Application = express();

expressApp.on("ready", () => {
  console.log("app is ready");
});

expressApp.use((req, res, next) => {
  console.log(`======= ${req.method} request for ${req.url} =======`);
  next();
});

expressApp.use("/", routes);

// knex.raw("select 1+1 as result")
//   .then(() => {
//     console.log("Postgres Database Connected");
//     expressApp.emit("ready");
//   })
//   .catch();

export default expressApp;
