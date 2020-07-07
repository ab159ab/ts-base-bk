// import { logError, logInfo } from '../../Utils/logging/logging';

const mailgun = require("mailgun-js");

const defaultLog = (err, resp) => {
  if (err) console.error(err);
  else console.log(resp);
};

const sendMail = (configs, emailDetails, emailResponseCb) => {
  const mg = mailgun({ apiKey: configs.apiKey, domain: configs.domain });
  mg.messages().send(emailDetails, (err, resp) => {
    defaultLog(err, resp);
    if (emailResponseCb) emailResponseCb(err, resp);
  });
};

module.exports = sendMail;
