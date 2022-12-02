const [file] = Deno.args;
const fileData = await Deno.readTextFile(file);

const elfs = fileData
  .split("\n\n")
  .map((x) => x.split("\n").reduce((a, y) => a + parseInt(y), 0))
  .sort((a, b) => b - a);

const answerOne = elfs[0];
const answerTwo = elfs.slice(0, 3).reduce((acc, x) => acc + x, 0);
console.log(`Answer One: ${answerOne}`);
console.log(`Answer Two: ${answerTwo}`);
