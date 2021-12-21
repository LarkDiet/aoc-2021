//Day 10

//const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-10/day10-data.txt';
const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-10/sample-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n').filter(l => l);
  return arr;
}

const openChars = ['(', '[', '{', '<'];
const closeChars = [')', ']', '}', '>'];

function findIllegalSyntax(line) {
	let ops = [];
	for (let i = 0; i < line.length; i++) {
  	if (openChars.includes(line[i])) ops.push(line[i]);
    else {
    	let openCh = ops.pop();
    	let closeCh = line[i];
      if (openChars.indexOf(openCh) != closeChars.indexOf(closeCh)) return closeCh;
    }
  }
}

async function findIllegalSyntaxScore() {
	let dataArr = await parseData();
  let illChs = [];
  let score = 0;
  for (let line of dataArr) illChs.push(findIllegalSyntax(line));
  illChs = illChs.filter(v => v);
  console.log(illChs);
  for (let ch of illChs) {
  	switch (ch) {
    	case ')':
      	score += 3;
        break;
      case ']':
      	score += 57;
        break;
      case '}':
      	score += 1197;
        break;
      case '>':
      	score += 25137;
        break;
      default:
      	break;
    }
  }
  return score;
}

async function completeCleanDataAndScore() {
	let dataArr = await parseData();
  let cleanData = dataArr.filter(l => !findIllegalSyntax(l));
  console.log(cleanData);
}

//findIllegalSyntaxScore().then(console.log);
completeCleanDataAndScore().then(console.log);
