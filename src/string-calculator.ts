export class StringCalculator {
  add(numbers: string): number {
    if (numbers === "") {
      return 0;
    }
    let parsedNumbers = numbers.split(",").map(Number);
    return parsedNumbers.reduce((acc, curr) => acc + curr, 0);
  }
}
