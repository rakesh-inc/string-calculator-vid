import {
  INumbersValidator,
  IStringParser,
  StringParserResult,
} from "./string-calculator.interface";

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
  parse(input: string): StringParserResult {
    if (!input.startsWith("//")) {
      return {
        regularExpression: new RegExp(`[,\n]`),
        updatedNumbers: input,
      };
    }

    let [delimiter, numbersString] = input.split("\n");
    delimiter = delimiter.slice(2);

    let updatedDelimiter = new RegExp(`[${delimiter}]`);
    if (delimiter.startsWith("[") && delimiter.endsWith("]")) {
      updatedDelimiter = new RegExp(
        `[${delimiter
          .split(/[\[\]]/)
          .filter(Boolean)
          .join("")}]`
      );
    }

    return {
      regularExpression: updatedDelimiter,
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
