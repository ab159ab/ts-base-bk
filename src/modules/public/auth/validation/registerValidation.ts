import { ValidationChain } from "express-validator";
import { passwordFieldValidation } from "./fieldsValidation";
import { emailFieldValidation, requiredFieldValidation } from "../../../../base/middlewares/fieldsValidationMiddleware";

const validations: ValidationChain[] = [
  requiredFieldValidation("firstName", "first name"),
  requiredFieldValidation("lastName", "last name"),
  requiredFieldValidation("email"),
  emailFieldValidation("email"),
  requiredFieldValidation("password"),
  passwordFieldValidation("password", 6),
];

export default validations;
