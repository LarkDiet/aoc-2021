//Day 3

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-3/day3-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n').filter(l => l);
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
    for (let a = 0; a < dataArr.length; a++) {
      if ((dataArr[a])[i] == 0) count0++;
      else count1++;
    }
    if (count0 > count1) gam.push(0);
    else gam.push(1);
  }
  eps = parseInt(gam.map(b => (1 - b)).join(''), 2);
  gam = parseInt(gam.join(''), 2);
  return gam * eps;
}

async function findOxGen() {
  let ox = await parseData();
  let bitLen = ox[0].length;
  for (let i = 0; i < bitLen; i++) {
    let count0 = 0;
    let count1 = 0;
    for (let a = 0; a < ox.length; a++) {
      if ((ox[a])[i] == 0) count0++;
      else count1++;
    }
    if (count0 > count1) ox = ox.filter(v => v[i] == 0);
    else ox = ox.filter(v => v[i] == 1);
    if (ox.length == 1) break;
  }
  return parseInt(ox[0], 2);
}

async function findCO2() {
  let co2 = await parseData();
  let bitLen = co2[0].length;
  for (let i = 0; i < bitLen; i++) {
    let count0 = 0;
    let count1 = 0;
    for (let a = 0; a < co2.length; a++) {
      if ((co2[a])[i] == 0) count0++;
      else count1++;
    }
    if (count0 > count1) co2 = co2.filter(v => v[i] == 1);
    else co2 = co2.filter(v => v[i] == 0);
    if (co2.length == 1) break;
  }
  return parseInt(co2[0], 2);
}

async function findLifeSup() {
  let ox = await findOxGen();
  let co2 = await findCO2();
  return ox * co2;
}

findPowerCons().then(console.log);
findLifeSup().then(console.log);
