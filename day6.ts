const [filePath] = Deno.args;

const fileData = await Deno.readTextFile(filePath);


for (let i = 0; i < fileData.length; i++) {
  const str = fileData.substring(i, i + 4);
  const set = new Set();
  let unique = true;
  let j = 0;
  for (; j < str.length; j++) {
    if (set.has(str[j])) {
      unique = false;
      break;
    }
    set.add(str[j]);
  }

  if (unique) {
    console.log(j + i);
    break;
  }
}

for (let i = 0; i < fileData.length; i++) {
  const str = fileData.substring(i, i + 14);
  const set = new Set();
  let unique = true;
  let j = 0;
  for (; j < str.length; j++) {
    if (set.has(str[j])) {
      unique = false;
      break;
    }
    set.add(str[j]);
  }

  if (unique) {
    console.log(j + i);
    break;
  }
}