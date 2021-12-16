//Day 7

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-7/sample-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split(',').map(v => parseInt(v));
  return arr;
}

function median(a) {
  let arr = a.sort((v1, v2) => v1 - v2);
  let mid = Math.floor(arr.length / 2);
  if (arr.length % 2 != 0) return arr[mid];
  else return ((arr[mid - 1] + arr[mid]) / 2);
}

function average(arr) {
  return Math.floor((arr.reduce((pv, cv) => pv + cv, 0) / arr.length));
}

async function findCheapestAlign() {
  let dataArr = await parseData();
  let med = median(dataArr);
  let cost = 0;
  for (let pos of dataArr) cost += Math.abs(pos - med);
  return cost;
}

//In part 2, fuel cost increments triangularly per step
//f(n) = n * (n + 1) / 2

async function findCheapestAlign2() {
  let dataArr = await parseData();
  let avg = average(dataArr);
  let cost = 0;
  let steps;
  for (let pos of dataArr) {
    steps = Math.abs(pos - avg);
    cost += (steps * (steps + 1) / 2);
  }
  return cost;
}

async function findCheapestAlign3() {
  let dataArr = await parseData();
  let costArr = [];
  //For each potential align position, calculate the cost and push to costArr
  let minPos = Math.min(...dataArr);
  let maxPos = Math.max(...dataArr);
  for (let i = minPos; i <= maxPos; i++) {
  	let cost = 0;
  	for (let cPos of dataArr) {
    	let steps = Math.abs(cPos - i);
      cost += (steps * (steps + 1) / 2);
    }
    costArr.push(cost);
  }
  return Math.min(...costArr);
}

//findCheapestAlign().then(console.log);
//findCheapestAlign2().then(console.log);
//alternatively...
findCheapestAlign3().then(console.log);
