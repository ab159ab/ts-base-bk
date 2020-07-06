/* eslint-disable */
import "regenerator-runtime/runtime";
import "core-js/stable";
import express from "express";
// import knex from "./base/database/knex/knex";

const expressApp = express();

expressApp.on("ready", () => {
  console.log("app is ready");
});

// knex.raw("select 1+1 as result")
//   .then(() => {
//     console.log("Postgres Database Connected");
//     expressApp.emit("ready");
//   })
//   .catch();

export default expressApp;
