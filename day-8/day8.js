//Day 8

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-8/day8-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n').filter(l => l);
  return arr;
}

async function countUniqueSegDigits() {
  let dataArr = await parseData();
  let outputs = dataArr.map(v => v.slice(v.indexOf('|') + 2));
  let ulengths = [2, 3, 4, 7];
  let usdCount = 0;
  for (let line of outputs) {
    let digs = line.split(' ');
    for (let dig of digs)
      if (ulengths.includes(dig.length)) usdCount++;
  }
  return usdCount;
}

async function decodeDataAndSum() {
  let dataArr = await parseData();
  let inputs = dataArr.map(v => v.slice(0, v.indexOf('|') - 1));
  let outputs = dataArr.map(v => v.slice(v.indexOf('|') + 2));
  let displays = [];
  for (let i = 0; i < dataArr.length; i++) {
    let decoder = Array(10).fill('_');
    let idigs = inputs[i].split(' ');
    decoder[1] = idigs.find(v => v.length == 2);
    decoder[7] = idigs.find(v => v.length == 3);
    decoder[4] = idigs.find(v => v.length == 4);
    decoder[8] = idigs.find(v => v.length == 7);
    //Next to find: 0, 2, 3, 5, 6, 9
    //0, 6, 9 have length 6 | 2, 3, 5 have length 5
    //6 must have only one of 1's chars. 0 and 9 will have both of them.
    //3 must include both 1's chars. 2 and 5 will only have one of them.
    //9 must include all 3's chars. 0 will be the remaining length 6.
    //5 must only have chars included in 6. 2 will be the remaining length 5.
    decoder[6] = idigs.find(v => v.length == 6 && !decoder[1].split('').every(c => v.includes(c)));
    decoder[3] = idigs.find(v => v.length == 5 && decoder[1].split('').every(c => v.includes(c)));
    decoder[9] = idigs.find(v => v.length == 6 && decoder[3].split('').every(c => v.includes(c)));
    decoder[0] = idigs.find(v => v.length == 6 && v != decoder[6] && v != decoder[9]);
    decoder[5] = idigs.find(v => v.length == 5 && v.split('').every(c => decoder[6].includes(c)));
    decoder[2] = idigs.find(v => v.length == 5 && v != decoder[3] && v != decoder[5]);
    //Now odigs can be decoded based on length and contents
    let odigs = outputs[i].split(' ');
    let displayVal = parseInt(odigs.map(v => decoder.findIndex(d => d.length == v.length && d.split('').every(c => v.includes(c)))).join(''));
    displays.push(displayVal);
  }
  return displays.reduce((pv, cv) => pv + cv, 0);
}

countUniqueSegDigits().then(console.log);
decodeDataAndSum().then(console.log);
