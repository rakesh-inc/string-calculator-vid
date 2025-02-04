export class StringCalculator {
  add(numbers: string): number {
    if (numbers === "") {
      return 0;
    }
    if (numbers.length === 1) {
      return parseInt(numbers);
    }
    let parsedNumber = numbers.split(",");
    return parseInt(parsedNumber[0]) + parseInt(parsedNumber[1]);
  }
}
