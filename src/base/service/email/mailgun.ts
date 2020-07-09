import mailgunJs from "mailgun-js";

const defaultLog = (err: any, resp: any) => {
  if (err) console.error(err);
  else console.log(resp);
};

export interface IMailgunConfig {
  domain: string,
  apiKey: string,
}

export interface IEmailConfig {
  subject: string,
  from: string,
  "h:Reply-To": string,
  to?: string,
  html?: string,
  text?: string,
}

const sendMail = (
  configs: IMailgunConfig,
  emailDetails: IEmailConfig,
  emailResponseCb: (err: string, resp: string) => void | null,
) => {
  const mg = mailgunJs({ apiKey: configs.apiKey, domain: configs.domain });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mg.messages().send(emailDetails, (err: string, resp: string) => {
    defaultLog(err, resp);
    if (emailResponseCb) emailResponseCb(err, resp);
  });
};

export default sendMail;
