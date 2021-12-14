//Day 6

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-6/day6-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split(',').map(v => parseInt(v));
  return arr;
}

async function findFishAfter(days) {
  let fishArr = await parseData();
  let breedGrps = Array(9).fill(0);
  for (let fish of fishArr) breedGrps[fish] += 1;
  let newFish;
  for (let i = 0; i < days; i++) {
    newFish = breedGrps.shift();
    breedGrps[6] += newFish;
    breedGrps.push(newFish);
  }
  return breedGrps.reduce((pv, cv) => pv + cv, 0);
}

findFishAfter(80).then(console.log);
findFishAfter(256).then(console.log);
