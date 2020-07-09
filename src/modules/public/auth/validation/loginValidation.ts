import {
  passwordFieldValidation,
} from "./fieldsValidation";
import { emailFieldValidation, requiredFieldValidation } from "../../../../base/middlewares/fieldsValidationMiddleware";

const validations = [
  requiredFieldValidation("email"),
  emailFieldValidation("email", false),
  requiredFieldValidation("password"),
  passwordFieldValidation("password", 6),
];

export default validations;
