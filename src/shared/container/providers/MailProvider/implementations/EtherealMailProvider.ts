import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import ITemplateMailProvider from '@shared/container/providers/TemplateMailProvider/models/ITemplateMailProvider';
import IMailProvider from '../model/IMailProvider';
import ISendMailDTO from '../dtos/ISendMaiDTO';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('TemplateMail')
    private templateMail: ITemplateMailProvider,
  ) {
    nodemailer.createTestAccount((err, account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    template,
  }: ISendMailDTO): Promise<void> {
    const message = {
      from: {
        name: from?.name || 'Equipe Diarias',
        address: from?.email || 'equipediarias@diarias.com',
      },
      to: {
        name: to?.name || 'Equipe Diarias',
        address: to?.email || 'equipediarias@diarias.com',
      },
      subject,
      html: await this.templateMail.parse(template),
    };

    this.client.sendMail(message, (err, info) => {
      if (err) {
        console.log(`Error occurred. ${err.message}`);
        return process.exit(1);
      }

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }
}

export default EtherealMailProvider;
