import { check } from "express-validator";
import { getI18nValByKey } from "../../../../base/service/i18n";

export const passwordFieldValidation = (fieldName, minLength) => check(fieldName)
  .isLength({ min: minLength })
  .withMessage(getI18nValByKey("validation.invalid_password_length", { minLength }));

export const compareFieldsValidation = (fromField, toField, fromFieldMsgAlias,
  toFieldMsgAlias) => check(fromField,
  getI18nValByKey("validation.invalid_compare_fields_match",
    { fromField: fromFieldMsgAlias || fromField, toField: toFieldMsgAlias || toField }))
  .exists()
  .custom((value, { req }) => value === req.body[toField]);
