const [filePath] = Deno.args;
const fileData = await Deno.readTextFile(filePath);

const inputs = fileData.split("\n").map((x) => x.split(" "));

// A X = ROCK
// B Y = PAPER
// C Z = SCISSORS

const obj: Record<string, string> = {
  A: "ROCK",
  X: "ROCK",
  B: "PAPER",
  Y: "PAPER",
  C: "SCISSORS",
  Z: "SCISSORS",
};

const scoreTally: Record<string, number> = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

let count = 0;
for (let i = 0; i < inputs.length; i++) {
  const opp = obj[inputs[i][0]];
  const you = obj[inputs[i][1]];
  count += scoreTally[you];

  if (opp === you) {
    count += 3;
    continue;
  }

  if (opp === "PAPER" && you === "SCISSORS") {
    count += 6;
  }

  if (opp === "SCISSORS" && you === "ROCK") {
    count += 6;
  }

  if (opp === "ROCK" && you === "PAPER") {
    count += 6;
    continue;
  }
}

// X LOSE
// Y DRAW
// Z WIN
const PICKER: Record<string, Record<string, number>> = {
  X: {
    ROCK: 3,
    PAPER: 1,
    SCISSORS: 2,
  },
  Y: {
    ROCK: 1 + 3,
    PAPER: 2 + 3,
    SCISSORS: 3 + 3,
  },
  Z: {
    ROCK: 2 + 6,
    PAPER: 3 + 6,
    SCISSORS: 1 + 6,
  },
};

let countTwo = 0;
for (let i = 0; i < inputs.length; i++) {
  const opp = obj[inputs[i][0]];
  const condition = inputs[i][1];
  console.log({ opp, condition, obj: PICKER[condition][opp] });
  countTwo += PICKER[condition][opp];
}

console.log(count);
console.log(countTwo);
