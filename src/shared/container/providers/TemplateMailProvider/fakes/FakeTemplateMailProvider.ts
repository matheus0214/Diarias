import ITemplateMailProvider from '../models/ITemplateMailProvider';

class FakeTemplateMailProvider implements ITemplateMailProvider {
  public async parse(): Promise<string> {
    return 'template';
  }
}

export default FakeTemplateMailProvider;
