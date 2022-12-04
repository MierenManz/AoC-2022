const [filePath] = Deno.args;
const fileData = await Deno.readTextFile(filePath);

const input = fileData.split("\n")
  .map((x) =>
    x.split(",").map(
      (y) => [parseInt(y.split("-")[0]), parseInt(y.split("-")[1])],
    )
  );

let count = 0;
for (let i = 0; i < input.length; i++) {
  const [rangeA, rangeB] = input[i];
  const aLen = rangeA[1] - rangeA[0];
  const bLen = rangeB[1] - rangeB[0];
  const [bigRange, smallRange] = aLen > bLen ? [rangeA, rangeB] : [rangeB, rangeA];

  count += Number((bigRange[0] <= smallRange[0] && bigRange[1] >= smallRange[1]));
}

let count2 = 0;
for (let i = 0; i < input.length; i++) {
  const [rangeA, rangeB] = input[i];
  const aLen = rangeA[1] - rangeA[0];
  const bLen = rangeB[1] - rangeB[0];

  const [bigRange, smallRange] = aLen > bLen ? [rangeA, rangeB] : [rangeB, rangeA];
  const isInRange = (bigRange[0] <= smallRange[0] && bigRange[1] >= smallRange[0]) || (bigRange[0] <= smallRange[1] && bigRange[1] >= smallRange[1]);
  count2 += Number(isInRange);
}

console.log(count, count2);
