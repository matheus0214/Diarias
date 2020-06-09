import IParseMailDTO from '@shared/container/providers/TemplateMailProvider/dtos/IParseMailDTO';

interface IMail {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMail;
  from?: IMail;
  subject: string;
  template: IParseMailDTO;
}
