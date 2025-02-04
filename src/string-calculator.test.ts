import { StringCalculator } from "./string-calculator";

describe("StringCalculator", () => {
  let calculator: StringCalculator;
  beforeEach(() => {
    calculator = new StringCalculator();
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

  it("should return the sum of number when separator is a new line character", () => {
    expect(calculator.add("1\n2,3")).toBe(6);
  });
});
