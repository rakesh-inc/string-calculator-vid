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

export interface IDelimiterChecker {
  isCustomDelimiter(input: string): boolean;
  isCustomEnclosedDelimiter(input: string): boolean;
}
