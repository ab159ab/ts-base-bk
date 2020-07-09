import registerValidation from "../validation/registerValidation";
import { validationResultMiddleware } from "../../../../base/middlewares/fieldsValidationMiddleware";

const middlewares = {
  register: [registerValidation, validationResultMiddleware],
};

export default middlewares;
