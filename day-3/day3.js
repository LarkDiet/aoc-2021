//Day 3

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-3/day3-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n');
  return arr;
}
  
async function findPowerCons() {
  let dataArr = await parseData();
  let gam = [];
  let eps;
  let bitLen = dataArr[0].length;
  for (let i = 0; i < bitLen; i++) {
	let count0 = 0;
	let count1 = 0;
    for (let a = 0; a < dataArr.length - 1; a++) {
      if ((dataArr[a])[i] == 0) count0++; else count1++;
	}
	if (count0 > count1) gam.push(0); else gam.push(1);
  }
  eps = parseInt(gam.map(b => (1 - b)).join(''), 2);
  gam = parseInt(gam.join(''), 2);
  return gam * eps;
}

findPowerCons().then(console.log);
