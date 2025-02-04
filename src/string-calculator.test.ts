import { StringCalculator } from "./string-calculator";

describe("StringCalculator", () => {
  it("should return 0 in case of empty string", () => {
    let calculator = new StringCalculator();
    expect(calculator.add("")).toBe(0);
  });
});
