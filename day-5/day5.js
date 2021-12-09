//Day 5

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
    let x1 = coords[0];
    let y1 = coords[1];
    let x2 = coords[2];
    let y2 = coords[3];
    if (x1 == x2 || y1 == y2) hvLines.push(coords.map(v => parseInt(v)));
  }
  return hvLines;
}

findHVLines().then(console.log);

async function findOverlaps() {
	let lines = await findHVLines();
  let mainMatrix = Array(1000).fill(Array(1000).fill(0));
  let ovPoints = [];
  for (let line of lines) {
  	let lineX1 = line[0];
    let lineY1 = line[1];
    let lineX2 = line[2];
    let lineY2 = line[3];
  	if (lineY1 == lineY2) {
    	mainMatrix[lineY1] = mainMatrix[lineY1].map(v, i => {
      	if (i <= Math.max(lineX1, lineX2) && i >= Math.min(lineX1, lineX2)) v++;
        });
    } else {
    	for (let i = Math.min(lineY1, lineY2); i <= Math.max(lineY1, lineY2); i++) {
      	mainMatrix[i][lineX1] = mainMatrix[i][lineX1] + 1;
      }
    }
  }
  //...
}
