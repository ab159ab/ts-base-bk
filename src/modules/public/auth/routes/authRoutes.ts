import { Router } from "express";
import { initRedisClient } from "../service/redis/redis";
import { registerController, verifyAccount } from "../controller/registerController";
import authValidationMiddlewares from "../middleware/authValidationMiddleware";
import { loginController, logoutController } from "../controller/loginController";

initRedisClient();

const router: Router = Router();

router.post("/register", ...authValidationMiddlewares.register, registerController);
router.post("/login", ...authValidationMiddlewares.login, loginController);
router.get("/logout", logoutController); // , ...authValidationMiddlewares.logout
router.get("/verify-account/:accountId", verifyAccount);

export default router;
