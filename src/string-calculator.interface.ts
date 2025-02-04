export interface StringParserResult {
  regularExpression: RegExp;
  updatedNumbers: string;
}

export interface IStringParser {
  parse(input: string): StringParserResult;
}
