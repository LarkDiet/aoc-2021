//Day 12
//Uhhhhhhhh

//const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-12/day12-data.txt';
const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-12/sample-data-3.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n').filter(l => l);
  return arr;
}

async function findValidPaths() {
  let dataArr = await parseData();
  let largeCaves = [...new Set(dataArr.join('-').split('-'))].filter(v => v == v.toUpperCase());
  let smallCaves = [...new Set(dataArr.join('-').split('-'))].filter(v => v == v.toLowerCase() && !['start', 'end'].includes(v));
  let allCaves = smallCaves.concat(largeCaves);
  console.log(allCaves);
  let startNodes = dataArr.filter(v => v.includes('start')).join('-').split('-').filter(v => v != 'start');
  let endNodes = dataArr.filter(v => v.includes('end')).join('-').split('-').filter(v => v != 'end');
  const outletsOf = (cave) => dataArr.filter(v => v.split('-').includes(cave) && !v.includes('start')).join('-').split('-').filter(v => v != cave);
  
  const caveMap = new Map();
  allCaves.forEach(c => caveMap.set(c, outletsOf(c)));
  //caveMap.forEach((v,k) => console.log(k + ': ' + v));

	/* Find all combinations that meet these rules
  	-Starts with a startNode
    -Ends with an endNode
    -Follows the continuity rules in the data set
    -Has at max 1 of each smallCave
    -Caves where the only outlet is a small cave are excluded
    */
  caveMap.forEach((v, k) => {
  	if (v.length == 1 && smallCaves.includes(v[0])) caveMap.delete(k);
  });
  caveMap.forEach((v,k) => console.log(k + ': ' + v));
  
  let paths = [];
  caveMap.forEach((v,k) => {
  	if (startNodes.includes(k)) paths.push(k);
  })
  while (true) {
  	paths.forEach(p => {
    	let lastStep = p[p.length - 1];
      let nextSteps = caveMap.get(lastStep).filter(n => n)
    })
  }
  

	/*
  //From each start branch, find and push the longest legal path/s
  //Illegal steps are where /every/ outlet is a small cave already in the path
  //Then push every possible shortcut starting from the end
  let longPaths = [];
  for (let sb of startBranches) {
    let lastStep = sb.substr(-2, 2);
    let legalPaths = [];
    let outlets = outletsOf(lastStep).filter(o => o != 'end');
    for (let o of outlets) {
    	let newPath = [lastStep, o];
      while(true) {
      	lastStep = newPath[newPath.length - 1];
      	let adjOutlets = outletsOf(lastStep).filter(o => o != 'end' && !outletsOf(o).every(oo => newPath.includes(oo) && smallCaves.includes(oo)));
        
      }
    }
  }
  */
}

findValidPaths().then(console.log);
