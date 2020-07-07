import loginValidation from "../validation/loginValidation";
import registerValidation from "../validation/registerValidation";
import changePasswordValidation from "../validation/changePasswordValidation";
import forgotPasswordValidation from "../validation/forgotPasswordValidation";
import resetPasswordValidation from "../validation/resetPasswordValidation";
import authMW from "../validation/authValidation";
import { validationResultMiddleware } from "../../../../base/middlewares/fieldsValidationMiddleware";

const middlewares = {
  login:
        [loginValidation, validationResultMiddleware],
  register:
        [registerValidation, validationResultMiddleware],
  changePassword:
        [authMW, changePasswordValidation, validationResultMiddleware],
  resetPassword:
        [resetPasswordValidation, validationResultMiddleware],
  forgotPassword:
        [forgotPasswordValidation, validationResultMiddleware],
  logout: [authMW],
};

export default middlewares;
