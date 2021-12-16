//Day 9

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-9/day9-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n').filter(l => l);
  return arr;
}

async function findLowsAndSum() {
	let dataArr = await parseData();
  let dataMatrix = dataArr.map(l => l.split('').map(v => parseInt(v)));
  let lowPoints = [];
  for (let y of dataMatrix) {
  	for (let x of dataMatrix) {
    	let cLoc = dataMatrix[y][x];
  		let compArr = [cLoc];
    }
  }
  
  for (let i = 0; i < dataArr.length; i ++) {
  	let pLocArr = [];
    let nLocArr = [];
  	let cLocArr = dataArr[i].split('').map(v => parseInt(v));
    if (i != 0) pLocArr = dataArr[i - 1].split('').map(v => parseInt(v));
    if (i != dataArr.length - 1) nLocArr = dataArr[i + 1].split('').map(v => parseInt(v));
		//A low point is any element of cLocArr that is the min of
    //c[i], p[i], n[i], c[i-1], c[i+1] (given all are !undefined)
    let compArr = [cLocArr[i]];
    let tryArr = [pLocArr[i], nLocArr[i], cLocArr[i - 1], cLocArr[i + 1]];
    for (let ele of tryArr) if (ele != undefined) compArr.push(ele);
    return compArr;
  }
}

findLowsAndSum().then(console.log);
