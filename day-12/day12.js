//Day 12
//Dont look this is a mess and also unfinished xcvbxbn

//const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-12/day12-data.txt';
const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-12/sample-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n').filter(l => l);
  return arr;
}

async function findValidPaths() {
  let dataArr = await parseData();
  let largeCaves = [...new Set(dataArr.join('-').split('-'))].filter(v => v == v.toUpperCase());
  console.log(largeCaves);
  let smallCaves = [...new Set(dataArr.join('-').split('-'))].filter(v => v == v.toLowerCase() && !['start', 'end'].includes(v));
  console.log(smallCaves);
  let startBranches = dataArr.filter(v => v.includes('start')).join('-').split('-').filter(v => v != 'start').map(v => 'start-' + v);
  console.log(startBranches);
  let endBranches = dataArr.filter(v => v.includes('end')).join('-').split('-').filter(v => v != 'end').map(v => v + '-end');
  console.log(endBranches);
  let paths = [];
  for (let sb of startBranches) {
    let currentStep = sb.substr(-2, 2);
		//Referencing the dataArr, find and evaluate each outlet from end of start branch
    let outlets = dataArr.filter(v => v.includes(currentStep) && !v.includes('start')).join('-').split('-').filter(v => v != currentStep);
    for (let outlet of outlets) {
      if (outlet == 'end')
        paths.push(sb + '-end');
      else {
      	let adjOutlets = dataArr.filter(v => v.includes(outlet) && !v.includes('start')).join('-').split('-').filter(v => v != outlet);
        for (let adjo of adjOutlets) {
        	if (adjo == 'end')
          	paths.push(sb + '-' + outlet + '-end');
          
        }
      }
    }
  }
  return paths;
}

findValidPaths().then(console.log);
