import "regenerator-runtime/runtime";
import "core-js/stable";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes from "./modules/public/auth/routes/authRoutes";
import knex from "./base/database/knex/knex";

const expressApp: Application = express();

expressApp.enable("trust proxy");// for proxy servers like nginx to forward ip of requesters
expressApp.use(cookieParser());
expressApp.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
expressApp.use(bodyParser.json({ limit: "50mb" }));
expressApp.set("json spaces", 2);

expressApp.on("ready", () => {
  console.log("app is ready");
});

expressApp.use((req, res, next) => {
  console.log(`======= ${req.method} request for ${req.url} =======`);
  next();
});

expressApp.use("/", routes);

knex.raw("select 1+1 as result")
  .then(() => {
    console.log("Postgres Database Connected");
    expressApp.emit("ready");
  })
  .catch();

export default expressApp;
