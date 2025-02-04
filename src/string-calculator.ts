export class StringCalculator {
  add(numbers: string): number {
    if (numbers === "") {
      return 0;
    }
    let regex = new RegExp(`[,\n]`);
    if (numbers.startsWith("//")) {
      let [delimiter, numbersString] = numbers.split("\n");
      delimiter = delimiter.slice(2);
      regex = new RegExp(`[${delimiter}]`);
      numbers = numbersString;
    }

    let parsedNumbers = numbers.split(regex).map(Number);
    return parsedNumbers.reduce((acc, curr) => acc + curr, 0);
  }
}
