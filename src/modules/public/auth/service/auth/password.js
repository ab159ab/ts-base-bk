import { sendEmail } from "../../../../../base/service/email/email";
import { getEmailByLeadIdDao, getUserByEmailDao } from "../../../../user/basic/dao/userDao";
import {
  changePasswordDao,
  deleteForgotPassToken,
  getDetailsByForgetPassTokenDao, getPasswordByLeadIdDao,
  insertPasswordResetTokenDao,
} from "../../dao/passwordDao";
import DbTBLS from "../../../../shared/DBTBL/TBL";
import {
  AUTH_INVALID_OLD_PASSWORD,
  AUTH_INVALID_REQUEST,
  AUTH_TOKEN_EXPIRED,
} from "../../constants/authConstants";
import { bcryptCompare, bcryptHash } from "../bcrypt";
import { appConfigs, appEnvConfig, appEnv } from "../../../../../base/loaders/baseLoader";
import { ENV_TESTING } from "../../../../../base/constants/globalConstants";
import { EMAIL_BODY_TYPE_HTML } from "../../../../../base/service/email/emailConstants";

const AUTH_ROUTE_RESET_PASSWORD = "/reset-password";
const { COLS: { EMAIL } } = DbTBLS.EMAIL;

export const isPasswordMatchByLeadId = async (trx, leadId, password) => {
  const userEncryptedPassword = await getPasswordByLeadIdDao(trx, leadId);
  if (password) {
    return bcryptCompare(password, userEncryptedPassword[DbTBLS.PASSWORD.COLS.HASHED_PASSWORD]);
  }
  return null;
};

export const changeUserPassword = async (trx, oldPassword, newPassword, sessionLeadId) => {
  if (!await isPasswordMatchByLeadId(trx, sessionLeadId, oldPassword)) {
    return AUTH_INVALID_OLD_PASSWORD;
  }

  if (await changePasswordDao(trx, sessionLeadId, await bcryptHash(newPassword))) {
    const userByEmail = await getEmailByLeadIdDao(trx, sessionLeadId);
    if (userByEmail && appEnv !== ENV_TESTING) {
      const emailBody = getI18nValByKey("email_body.password_changed");
      sendEmail(userByEmail[EMAIL], emailBody, null, "html");
    }
    return true;
  }
  return false;
};

export const requestForgotPassword = async (trx, email) => {
  const user = await getUserByEmailDao(trx, email);
  if (user) {
    // TODO: need to fix expiration mins this expires early
    const resetTokenExpireTime = Date.now()
      + (appConfigs.auth.resetPasswordExpireTimeInMinutes * 600);
    const tokenId = await insertPasswordResetTokenDao(trx, user.leadId, resetTokenExpireTime);
    if (appEnv !== ENV_TESTING) {
      console.log("FORGOTTEN PWD");
      const emailBody = `<a href='${appEnvConfig.fe.fullUrl}/${AUTH_ROUTE_RESET_PASSWORD}/${tokenId}'></a>`;
      sendEmail(email, emailBody, null, EMAIL_BODY_TYPE_HTML);
    }
    return true;
  }
  return false;
};

export const forgotPasswordChange = async (trx, token, newPassword) => {
  // const {fnam, lname} = await getPersonDetailsByLeadIdDao(trx, leadId);
  // const emailList = await getEmailListByUserId(trx, leadId);
  const tokenDetails = await getDetailsByForgetPassTokenDao(trx, token);
  if (!tokenDetails) return AUTH_INVALID_REQUEST;
  const {
    leadId,
    [DbTBLS.FORGOT_PASSWORD.COLS.Token_Expiry_DATE]: tokenExpiryDate,
  } = tokenDetails;

  const isTokenExpired = Date.now() > tokenExpiryDate;
  if (isTokenExpired) return AUTH_TOKEN_EXPIRED;

  // TODO: {MA} use promise.all
  await changePasswordDao(trx, leadId, await bcryptHash(newPassword));
  await deleteForgotPassToken(trx, token);
  return true;
};
