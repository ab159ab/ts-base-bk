import mailgunJs, { ConstructorParams, Error } from "mailgun-js";
import Mailgun = require("mailgun-js");
import SendResponse = Mailgun.messages.SendResponse;
import SendData = Mailgun.messages.SendData;

const defaultLog = (err: Error, resp: SendResponse) => {
  if (err) console.error(err);
  else console.log(resp);
};

const sendMail = (
  configs: ConstructorParams,
  emailDetails: SendData,
  emailResponseCb?: (err: Error, resp: SendResponse) => void | null,
):void => {
  const mg = mailgunJs({ apiKey: configs.apiKey, domain: configs.domain });
  mg.messages().send(emailDetails, (err: Error, resp: SendResponse) => {
    defaultLog(err, resp);
    if (emailResponseCb) emailResponseCb(err, resp);
  });
};

export default sendMail;
