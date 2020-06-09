import handlebars from 'handlebars';
import fs from 'fs';

import ITemplateMailProvider from '../models/ITemplateMailProvider';
import IParseMailDTO from '../dtos/IParseMailDTO';

class HandlebarsTemplateMailProvider implements ITemplateMailProvider {
  public async parse({ file, variables }: IParseMailDTO): Promise<string> {
    const fileTemplate = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const templateParsed = handlebars.compile(fileTemplate);

    return templateParsed(variables);
  }
}

export default HandlebarsTemplateMailProvider;
