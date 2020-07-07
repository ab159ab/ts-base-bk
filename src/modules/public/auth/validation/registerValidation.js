import { passwordFieldValidation } from "./fieldsValidation";
import { emailFieldValidation, requiredFieldValidation } from "../../../../base/middlewares/fieldsValidationMiddleware";

const validations = [
  requiredFieldValidation("firstName", "first name"),
  requiredFieldValidation("lastName", "last name"),
  requiredFieldValidation("email"),
  emailFieldValidation("email", "email address"),
  requiredFieldValidation("password"),
  passwordFieldValidation("password", 6),
];

export default validations;
