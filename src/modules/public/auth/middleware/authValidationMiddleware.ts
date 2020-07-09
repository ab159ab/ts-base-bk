import registerValidation from "../validation/registerValidation";
import loginValidation from "../validation/loginValidation";
import { validationResultMiddleware } from "../../../../base/middlewares/fieldsValidationMiddleware";

const middlewares = {
  register: [registerValidation, validationResultMiddleware],
  login: [loginValidation, validationResultMiddleware],
};

export default middlewares;
