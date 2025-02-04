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
});
