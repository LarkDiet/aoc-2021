//Day 7

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-7/day7-data.txt';

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
  console.log(avg);
  let cost = 0;
  let steps;
  for (let pos of dataArr) {
  	steps = Math.abs(pos - avg);
    cost += (steps * (steps + 1) / 2);
  }
  return cost;
}

findCheapestAlign().then(console.log);
findCheapestAlign2().then(console.log);
