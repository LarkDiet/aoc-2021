//Day 8

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-8/day8-data.txt';
//const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-8/sample-data.txt';

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

async function decodeData() {
  let dataArr = await parseData();
  let inputs = dataArr.map(v => v.slice(0, v.indexOf('|') - 1));
  let outputs = dataArr.map(v => v.slice(v.indexOf('|') + 2));
  let ulengths = [2, 3, 4, 7];
  for (let i = 0; i < dataArr.length; i++) {
  	let decoder = Array(10).fill('_');
    let idigs = inputs[i].split(' ');
    for (let idig of idigs) {
    	if (ulengths.includes(idig.length)) {
      	switch (idig.length) {
        	case 2:
          	decoder[1] = idig;
            break;
          case 3:
          	decoder[7] = idig;
            break;
          case 4:
          	decoder[4] = idig;
            break;
          case 7:
          	decoder[8] = idig;
            break;
          default:
          	break;
        }
      }
    }
  }

countUniqueSegDigits().then(console.log);
