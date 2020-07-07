import { check, ValidationChain, validationResult } from "express-validator";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import i18nCommon from "../../modules/shared/i18n/common/bk/en";

const {
  validation: {
    maxLength, minLength, invalidEmail, required,
  },
} = i18nCommon;
export const requiredFieldValidation = (
  fieldName: string, fieldMsgAlias?: string,
): ValidationChain => check(fieldName)
  .exists({ checkFalsy: true, checkNull: true })
  .withMessage(required(fieldMsgAlias || fieldName));

export const nonEmptyFieldValidation = (
  fieldName: string, fieldMsgAlias?: string,
): ValidationChain => check(fieldName)
  .notEmpty()
  .withMessage(required(fieldMsgAlias || fieldName));

export const minLengthValidation = (
  minCharacters:number, fieldName: string, fieldAlias?: string,
): ValidationChain => check(fieldName)
  .isLength({ min: minCharacters })
  .withMessage(minLength(fieldAlias || fieldName, minCharacters));

export const maxLengthValidation = (
  maxCharacters: number, fieldName: string, fieldAlias?: string,
): ValidationChain => check(fieldName)
  .isLength({ max: maxCharacters })
  .withMessage(maxLength(fieldAlias || fieldName, maxCharacters));

export const validationResultMiddleware = (
  req: Request, res: Response, next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(UNPROCESSABLE_ENTITY).json({ message: errors.array()[0].msg });
  } else next();
};
export const emailFieldValidation = (
  fieldName: string, optional = true,
): ValidationChain => check(fieldName)
  .optional({ checkFalsy: optional })
  .isEmail()
  .withMessage(invalidEmail());
