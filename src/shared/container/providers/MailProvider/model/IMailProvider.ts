import ISendMailDTO from '../dtos/ISendMaiDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
