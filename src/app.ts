import app from "./preApp";
import { port } from "./base/loaders/baseLoader";
import { testCtr } from "./modules/test/controller/testCtr";

console.log("--------", process.env.ENV);
app.get("/test", testCtr);

app.listen(port, () => {
  console.log(`app is ready on port: ${port}`);
});
