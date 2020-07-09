import mailgun, { IEmailConfig, IMailgunConfig } from "./mailgun";

import {
  EMAIL_BODY_TYPE_HTML,
  EMAIL_SERVICE_MAIL_GUN,
  EMAIL_SERVICE_SEND_GRID,
} from "./emailConstants";
import { otherConfigs } from "../../../../configs/config";

const emailTransportServiceName: string = otherConfigs.emailService.transport();
const emailTransportServiceConfig = otherConfigs.emailService.mailgun;
const emailConfig = emailTransportServiceConfig.email;

const defaultEmailConfig: IEmailConfig = {
  subject: emailConfig.subject(),
  from: emailConfig.from(),
  "h:Reply-To": emailConfig.replyTo(),
};

// eslint-disable-next-line import/prefer-default-export
export const sendEmail = (
  recipient: string, body: string,
  emailResponseCallback?: (err: string, resp: string) => void | null,
  bodyType = EMAIL_BODY_TYPE_HTML,
): void => {
  const emailServiceConfig: IMailgunConfig = {
    domain: emailTransportServiceConfig.domain(),
    apiKey: emailTransportServiceConfig.apiKey(),
  };
  const emailConfigs: IEmailConfig = { ...defaultEmailConfig };
  if (emailTransportServiceName === EMAIL_SERVICE_MAIL_GUN) {
    emailConfigs.html = body; // TODO: emailBody[bodyType || EMAIL_BODY_TYPE_HTML] = body;
    emailConfigs.to = recipient;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mailgun(emailServiceConfig, emailConfigs, emailResponseCallback);
  } else if (emailTransportServiceName === EMAIL_SERVICE_SEND_GRID) { /* other transport */ }
};
