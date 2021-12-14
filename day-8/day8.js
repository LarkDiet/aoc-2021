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
  let outputs = dataArr.map(v => v.slice(v.indexOf("|") + 2));
  let ulengths = [2, 3, 4, 7];
  let usdCount = 0;
  for (let line of outputs) {
  	let digs = line.split(' ');
  	for (let dig of digs) if (ulengths.includes(dig.length)) usdCount++;
  }
  return usdCount;
}

countUniqueSegDigits().then(console.log);
