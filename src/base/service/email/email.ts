import Mailgun, { ConstructorParams, Error } from "mailgun-js";
import mailgun from "./mailgun";

import {
  EMAIL_BODY_TYPE_HTML,
  EMAIL_SERVICE_MAIL_GUN,
  EMAIL_SERVICE_SEND_GRID,
} from "./emailConstants";
import { otherConfigs } from "../../../../configs/config";
import SendResponse = Mailgun.messages.SendResponse;
import SendData = Mailgun.messages.SendData;

const emailTransportServiceName: string = otherConfigs.emailService.transport();
const emailTransportServiceConfig = otherConfigs.emailService.mailgun;
const emailConfig = emailTransportServiceConfig.email;

const sendEmail = (
  recipient: string, body: string,
  emailResponseCallback?: (err: Error, resp: SendResponse) => void,
  bodyType = EMAIL_BODY_TYPE_HTML,
): void => {
  const emailServiceConfig: ConstructorParams = {
    domain: emailTransportServiceConfig.domain(),
    apiKey: emailTransportServiceConfig.apiKey(),
  };
  if (emailTransportServiceName === EMAIL_SERVICE_MAIL_GUN) {
    const defaultEmailConfig: SendData = {
      subject: emailConfig.subject(),
      from: emailConfig.from(),
      "h:Reply-To": emailConfig.replyTo(),
      to: recipient,
    };

    if (bodyType === EMAIL_BODY_TYPE_HTML) defaultEmailConfig.html = body;
    else defaultEmailConfig.text = body;

    mailgun(emailServiceConfig, defaultEmailConfig, emailResponseCallback);
  } else if (emailTransportServiceName === EMAIL_SERVICE_SEND_GRID) { /* other transport */ }
};

export default sendEmail;
