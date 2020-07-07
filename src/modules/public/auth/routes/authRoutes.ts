import { Router } from "express";
import { initRedisClient } from "../service/redis/redis";
import { registerController } from "../controller/registerController";

initRedisClient();

const router: Router = Router();
// expressRouter.use(testCookieSetMiddleware);

router.post("/register", registerController);
// expressRouter.post("/login", authMiddlewares.login, loginController);
// expressRouter.post("/change-password", authMiddlewares.changePassword,
//   changeUserPasswordController);
// expressRouter.post("/forgot-password", authMiddlewares.forgotPassword,
//   requestForgotPasswordController);
// expressRouter.post("/reset-password/:token", authMiddlewares.resetPassword,
//   forgotPasswordChangeController);
// expressRouter.get("/verify-account/:accountId",
//   verifyAccount);
// expressRouter.get("/logout", authMiddlewares.logout, logout);

export default router;
