//Day 5
//please don't run this it crashed my ide xcvbzxcvn

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-5/day5-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n').filter(l => l);
  return arr;
}

async function findHVLines() {
	let dataArr = await parseData();
  let hvLines = [];
  for (let i = 0; i < dataArr.length; i++) {
  	let coords = dataArr[i].split(/\D/g).filter(v => v);
    console.log(coords);
    let x1 = coords[0];
    let y1 = coords[1];
    let x2 = coords[2];
    let y2 = coords[3];
    
    if (x1 == x2) {
    	hvLines.push(Array.from(Array(Math.abs(y1 - y2)), (_, i) => [x1, Math.min(y1, y2) + i]));
    } else if (y1 == y2) {
    	hvLines.push(Array.from(Array(Math.abs(x1 - x2)), (_, i) => [y1, Math.min(x1, x2) + i]));
    }
  }
  return hvLines;
}

findHVLines().then(console.log);

async function findOverlaps() {
	let lines = await findHVLines();
  let ovPoints = [];
  for (let i = 1; i < lines.length; i++) {
  	let line;
    
  }
}
