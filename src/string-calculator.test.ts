import {
  DelimiterContext,
  NumbersValidator,
  StringCalculator,
  StringParser,
  ResultBuilder,
} from "./string-calculator";

describe("StringCalculator", () => {
  let calculator: StringCalculator;
  beforeEach(() => {
    calculator = new StringCalculator(
      new StringParser(new DelimiterContext(), new ResultBuilder()),
      new NumbersValidator()
    );
  });

  it("should return 0 in case of empty string", () => {
    expect(calculator.add("")).toBe(0);
  });

  it("should return the number if single number is passed", () => {
    expect(calculator.add("4")).toBe(4);
  });

  it("should return the sum when two numbers are passed", () => {
    expect(calculator.add("1,2")).toBe(3);
  });

  it("should return the sum when multiple numbers are passed", () => {
    expect(calculator.add("1,2,3,4,5,6,7,8,9")).toBe(45);
  });

  it("should return the sum of numbers when separator is a new line character", () => {
    expect(calculator.add("1\n2,3")).toBe(6);
  });

  it("should return sum of numbers when we pass in the custom separator", () => {
    expect(calculator.add("//;\n1;2")).toBe(3);
  });

  it("should throw an error in case there are negative number", () => {
    expect(() => calculator.add("1,-2,-3")).toThrow("error: negatives not allowed: -2 -3");
  });

  it("should ignore numbers bigger than 1000", () => {
    expect(calculator.add("1001,2")).toBe(2);
  });

  it("should return sum when arbitrary length delimiter are passed", () => {
    expect(calculator.add("//[***]\n1***2***3")).toBe(6);
  });

  it("should return sum when multiple single lenght enclosed delimiter are passed", () => {
    expect(calculator.add("//[*][%]\n1*2%3")).toBe(6);
  });

  it("should return sum when multiple longer-length enclosed delimiter are passed", () => {
    expect(calculator.add("//[foo][bar]\n1foo2bar3")).toBe(6);
  });
});
