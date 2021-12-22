//Day 10

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-10/day10-data.txt';

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

function findMissingChars(line) {
	let ops = [];
  let missing = [];
  for (let ch of line) {
  	if (openChars.includes(ch)) ops.push(ch);
    else ops.pop();
  }
  for (let ch of ops.reverse()) {
  	switch (ch) {
    	case '(':
      	missing.push(')');
        break;
      case '[':
      	missing.push(']');
        break;
      case '{':
      	missing.push('}');
        break;
      case '<':
      	missing.push('>');
        break;
      default:
      	break;
    }
  }
  return missing;
}

function median(a) {
  let arr = a.sort((v1, v2) => v1 - v2);
  let mid = Math.floor(arr.length / 2);
  if (arr.length % 2 != 0) return arr[mid];
  else return ((arr[mid - 1] + arr[mid]) / 2);
}

async function findIllegalSyntaxScore() {
	let dataArr = await parseData();
  let illChs = [];
  let score = 0;
  for (let line of dataArr) illChs.push(findIllegalSyntax(line));
  illChs = illChs.filter(v => v);
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
  let compStrings = cleanData.map(l => findMissingChars(l));
  let scores = [];
  for (let line of compStrings) {
  	let score = 0;
    for (let ch of line) {
    	score *= 5;
      switch (ch) {
      	case ')':
        	score += 1;
          break;
        case ']':
        	score += 2;
          break;
        case '}':
        	score += 3;
          break;
        case '>':
        	score += 4;
          break;
        default:
        	break;
      }
    }
    scores.push(score);
  }
  return median(scores);
}

findIllegalSyntaxScore().then(console.log);
completeCleanDataAndScore().then(console.log);
