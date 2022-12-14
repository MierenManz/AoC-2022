import { TextLineStream } from "https://deno.land/std@0.167.0/streams/text_line_stream.ts";
const [filePath] = Deno.args;

const handle = await Deno.open(filePath, { read: true });
// const {body} = await fetch("https://asunaproject.nl/downloads/input.txt")
const REG = /\s{4}|(\[.{1}\]( |$))/g;
const REG2 = /move\s+(\d+)\s+from\s+(\d+)\s+to\s+(\d+)/;

const decoderStream = new TextDecoderStream();
const lineStream = new TextLineStream();

const stackStream: TransformStream<string, { stack: number; char: string }> =
  new TransformStream({
    transform(line: string, controller) {
      const res = line.match(REG);
      if (res === null) {
        controller.terminate();
        return;
      }

      res.forEach((x, i) => {
        if (x.startsWith("[")) {
          controller.enqueue({ char: x.trim(), stack: i });
        }
      });
    },
  });

let isInput = false;
const instructionStream: TransformStream<
  string,
  { count: number; from: number; to: number }
> = new TransformStream({
  transform(instruction: string, controller) {
    if (!isInput) {
      isInput = !isInput && instruction.length === 0;
      return;
    }
    const [_, countStr, fromStr, toStr] = REG2.exec(instruction)!;

    controller.enqueue({
      count: parseInt(countStr),
      from: parseInt(fromStr) - 1,
      to: parseInt(toStr) - 1,
    });
  },
});

const lines = handle.readable
  .pipeThrough(decoderStream)
  .pipeThrough(lineStream);

const [stackInfo, instructionInfo] = lines.tee();
const [stackInputs, stackInputs2] = stackInfo.pipeThrough(stackStream).tee();
const [instructionInputs, instructionInputs2] = instructionInfo.pipeThrough(
  instructionStream,
).tee();

{
  const stacks: string[][] = new Array(9).fill(null).map(() => []);

  for await (const crate of stackInputs) {
    stacks[crate.stack].push(crate.char);
  }

  stacks.forEach((x) => x.reverse());

  for await (const instruction of instructionInputs) {
    for (let i = 0; i < instruction.count; i++) {
      const crate = stacks[instruction.from].pop()!;
      stacks[instruction.to].push(crate);
    }
  }

  let result = "";

  for (let i = 0; i < stacks.length; i++) {
    const stack = stacks[i];
    result += stack.pop()?.[1] ?? "";
  }
  console.log(result);
}

{
 
  const stacks: string[][] = new Array(9).fill(null).map(() => []);

  for await (const crate of stackInputs2) {
    stacks[crate.stack].push(crate.char);
  }

  stacks.forEach((x) => x.reverse()); 


  for await (const instruction of instructionInputs2) {
    const tmp = []
    for (let i = 0; i < instruction.count; i++) {
      const crate = stacks[instruction.from].pop()!;
      // stacks[instruction.to].push(crate);
      tmp.push(crate);
    }
    tmp.reverse().forEach(x => stacks[instruction.to].push(x));
  }

  let result = "";

  for (let i = 0; i < stacks.length; i++) {
    const stack = stacks[i];
    result += stack.pop()?.[1] ?? "";
  }
  console.log(result);
}