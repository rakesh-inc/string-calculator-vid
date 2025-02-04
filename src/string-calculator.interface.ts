export interface StringParserResult {
  regularExpression: RegExp;
  updatedNumbers: string;
}

export interface IStringParser {
  parse(input: string): StringParserResult;
}

export interface INumbersValidator {
  validate(input: number[]): number[];
}

export interface IResultBuilder {
  build(regex: RegExp, input: string): StringParserResult;
}

export interface IDelimiterStrategy {
  canHandle(input: string): boolean;
  parse(input: string): RegExp;
}

export interface IDelimiterContext {
  parseDelimiter(input: string): RegExp;
}
