import {
  IDelimiterChecker,
  INumbersValidator,
  IStringParser,
  StringParserResult,
} from "./string-calculator.interface";

export class DelimiterChecker implements IDelimiterChecker {
  isCustomDelimiter(input: string): boolean {
    return input.startsWith("//");
  }

  isCustomEnclosedDelimiter(input: string): boolean {
    return input.startsWith("[") && input.endsWith("]");
  }
}

export class NumbersValidator implements INumbersValidator {
  private LARGE_NUMBER = 1000;

  validate(input: number[]): number[] {
    this.validateNegatives(input);
    return this.largeNumberValidation(input);
  }

  private validateNegatives(numbers: number[]): void {
    if (numbers.some((number) => number < 0)) {
      throw new Error(
        `error: negatives not allowed: ${numbers.filter((number) => number < 0).join(" ")}`
      );
    }
  }

  private largeNumberValidation(numbers: number[]): number[] {
    return numbers.filter((number) => number <= this.LARGE_NUMBER);
  }
}

export class StringParser implements IStringParser {
  constructor(private delimiterChecker: DelimiterChecker) {}

  parse(input: string): StringParserResult {
    if (!this.delimiterChecker.isCustomDelimiter(input)) {
      return {
        regularExpression: new RegExp(`[,\n]`),
        updatedNumbers: input,
      };
    }

    let [delimiter, numbersString] = input.split("\n");
    delimiter = delimiter.slice(2);

    if (!this.delimiterChecker.isCustomEnclosedDelimiter(delimiter)) {
      return {
        regularExpression: new RegExp(`[${delimiter}]`),
        updatedNumbers: numbersString,
      };
    }
    return {
      regularExpression: new RegExp(
        `[${delimiter
          .split(/[\[\]]/)
          .filter(Boolean)
          .join("")}]`
      ),
      updatedNumbers: numbersString,
    };
  }
}

export class StringCalculator {
  constructor(private stringParser: IStringParser, private numbersValidator: INumbersValidator) {}

  add(numbers: string): number {
    if (numbers === "") {
      return 0;
    }

    const { regularExpression, updatedNumbers } = this.stringParser.parse(numbers);

    let parsedNumbers = updatedNumbers.split(regularExpression).map(Number);
    parsedNumbers = this.numbersValidator.validate(parsedNumbers);
    return parsedNumbers.reduce((acc, curr) => acc + curr, 0);
  }
}
