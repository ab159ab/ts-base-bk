import app from "./preApp";
// import { appEnvConfig } from "./base/loaders/baseLoader";
import { testCtr } from "./modules/test/controller/testCtr";

console.log("--------", process.env.ENV);
app.get("/test", testCtr);

app.listen("4321", () => {
  console.log(`app is ready on port: ${"4321"}`);
});
