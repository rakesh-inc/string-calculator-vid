import { StringCalculator } from "./string-calculator";

describe("StringCalculator", () => {
  it("should return 0 in case of empty string", () => {
    let calculator = new StringCalculator();
    expect(calculator.add("")).toBe(0);
  });

  it("should return the number if single number is passed", () => {
    let calculator = new StringCalculator();
    expect(calculator.add("4")).toBe(4);
  });
});
