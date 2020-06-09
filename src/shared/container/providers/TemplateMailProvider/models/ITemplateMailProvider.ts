import IParseMailDTO from '../dtos/IParseMailDTO';

export default interface ITemplateMailProvider {
  parse(data: IParseMailDTO): Promise<string>;
}
