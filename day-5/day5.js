//Day 5

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-5/day5-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n').filter(l => l);
  return arr;
}

async function findOverlaps() {
	let dataArr = await parseData();
  let lineArr = [];
  for (let i = 0; i < dataArr.length; i++) {
  	let line;
    
  }
}
