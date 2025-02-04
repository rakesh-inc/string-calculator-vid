import { IStringParser, StringParserResult } from "./string-calculator.interface";

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

    return {
      regularExpression: new RegExp(`[${delimiter}]`),
      updatedNumbers: numbersString,
    };
  }
}

export class StringCalculator {
  constructor(private stringParser: IStringParser) {}

  add(numbers: string): number {
    if (numbers === "") {
      return 0;
    }

    const { regularExpression, updatedNumbers } = this.stringParser.parse(numbers);

    let parsedNumbers = updatedNumbers
      .split(regularExpression)
      .map(Number)
      .filter((number) => number <= 1000);

    if (parsedNumbers.some((number) => number < 0)) {
      throw new Error(
        `error: negatives not allowed: ${parsedNumbers.filter((number) => number < 0).join(" ")}`
      );
    }
    return parsedNumbers.reduce((acc, curr) => acc + curr, 0);
  }
}
