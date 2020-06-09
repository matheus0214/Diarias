interface IContentVariables {
  [key: string]: string | number;
}

export default interface IParseMailDTO {
  file: string;
  variables: IContentVariables;
}
