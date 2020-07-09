import {
  passwordFieldValidation,
} from "./fieldsValidation";
import { requiredFieldValidation } from "../../../../base/middlewares/fieldsValidationMiddleware";

const validations = [
  requiredFieldValidation("oldPassword"),
  passwordFieldValidation("oldPassword", 6),
  requiredFieldValidation("newPassword"),
  passwordFieldValidation("newPassword", 6),
];

export default validations;
