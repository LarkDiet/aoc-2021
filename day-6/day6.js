//Day 6

//const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-6/day6-data.txt';
const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-6/sample-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split(',').map(v => parseInt(v));
  return arr;
}

//This crashes when running the real data test lmao
async function findFishAfterDays(days) {
  let fishArr = await parseData();
  let newFish = [];
	for (let i = 0; i < days; i++) {
  	fishArr = fishArr.map(v => {
    	if (v == 0) {
      	newFish.push(8);
        return 6;
      } else return v - 1;
    })
    fishArr = fishArr.concat(newFish);
    newFish = [];
    console.log(fishArr);
  }
  return fishArr.length;
}

findFishAfterDays(80).then(console.log);
