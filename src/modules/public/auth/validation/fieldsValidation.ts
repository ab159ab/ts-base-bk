import { check } from "express-validator";

// eslint-disable-next-line import/prefer-default-export
export const passwordFieldValidation = (fieldName: string, minLength: number) => check(fieldName)
  .isLength({ min: minLength })
  .withMessage(`Invalid password length, The length should be at least ${minLength} or more`);
