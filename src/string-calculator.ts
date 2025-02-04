import {
  IResultBuilder,
  INumbersValidator,
  IStringParser,
  StringParserResult,
  IDelimiterStrategy,
  IDelimiterContext,
} from "./string-calculator.interface";

export class DefaultDelimiterStrategy implements IDelimiterStrategy {
  canHandle(input: string): boolean {
    return !input.startsWith("//");
  }
  parse(input: string): RegExp {
    return new RegExp(`[,\n]`);
  }
}

export class SingleDelimiterStrategy implements IDelimiterStrategy {
  canHandle(input: string): boolean {
    return input.startsWith("//") && !input.includes("[") && !input.includes("]");
  }
  parse(input: string): RegExp {
    const delimiter = input.slice(2).split("\n")[0];
    return new RegExp(`[${delimiter}]`);
  }
}

export class MulitipleDelimiterStrategy implements IDelimiterStrategy {
  canHandle(input: string): boolean {
    return input.startsWith("//") && input.includes("[") && input.includes("]");
  }

  parse(input: string): RegExp {
    const delimiterSection = input.slice(2).split("\n")[0];
    const delimiter = delimiterSection
      .split(/[\[\]]/)
      .filter(Boolean)
      .join("");
    return RegExp(`[${delimiter}]`);
  }
}

export class DelimiterContext implements IDelimiterContext {
  private strategies: IDelimiterStrategy[];
  constructor() {
    this.strategies = [
      new DefaultDelimiterStrategy(),
      new SingleDelimiterStrategy(),
      new MulitipleDelimiterStrategy(),
    ];
  }
  parseDelimiter(input: string): RegExp {
    const strategy = this.strategies.find((s) => s.canHandle(input));
    if (!strategy) {
      throw new Error("No suitable strategy found");
    }
    return strategy.parse(input);
  }
}

export class ResultBuilder implements IResultBuilder {
  build(regex: RegExp, input: string): StringParserResult {
    return {
      regularExpression: regex,
      updatedNumbers: input,
    };
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
  constructor(private delimiterContext: IDelimiterContext, private resultBuilder: IResultBuilder) {}

  parse(input: string): StringParserResult {
    const regex = this.delimiterContext.parseDelimiter(input);
    const numbers = input.startsWith("//") ? input.split("\n")[1] : input;
    return this.resultBuilder.build(regex, numbers);
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
