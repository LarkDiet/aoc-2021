//Day 9

//const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-9/day9-data.txt';
const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-9/sample-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n').filter(l => l);
  return arr;
}

async function findLows() {
  let dataArr = await parseData();
  let dataMatrix = dataArr.map(l => l.split('').map(v => parseInt(v)));
  let lowPoints = [];
  for (let y = 0; y < dataMatrix.length; y++) {
    for (let x = 0; x < dataMatrix[y].length; x++) {
      let cLoc = dataMatrix[y][x];
      let compArr = [dataMatrix[y][x - 1], dataMatrix[y][x + 1]].filter(v => v != undefined);
      if (y != 0) compArr.push(dataMatrix[y - 1][x]);
      if (y != dataMatrix.length - 1) compArr.push(dataMatrix[y + 1][x]);
      if (compArr.every(v => v > cLoc)) lowPoints.push([y, x]);
    }
  }
  return lowPoints;
}

async function riskAndSum() {
  let dataArr = await parseData();
  let dataMatrix = dataArr.map(l => l.split('').map(v => parseInt(v)));
  let lpArr = await findLows();
  return lpArr.map(yx => dataMatrix[yx[0]][yx[1]] + 1).reduce((pv, cv) => pv + cv, 0);
}

async function findBasinsAndProd3() {
  let dataArr = await parseData();
  let dataMatrix = dataArr.map(l => l.split('').map(v => parseInt(v)));
  let lpArr = await findLows();
  let basins = [];
  //Coordinates in each basin include those between
  //Two nines and/or a nine and a matrix edge
  //That are adjacent to the lp or its adjacent branches
  for (let lp of lpArr) {
  	//Init the basin for this lp
    //Each loop, only check this layer of linked coords
    let basin = [lp];
    let currentLayer = [lp];
    let hasNew = true;
    while (hasNew) {
      let newLayer = [];
      for (let yx of currentLayer) {
        let y = yx[0];
        let x = yx[1];
        let newBranch = [];
        if (![undefined, 9].includes(dataMatrix[y][x - 1])) newBranch.push([y, x - 1]);
        if (![undefined, 9].includes(dataMatrix[y][x + 1])) newBranch.push([y, x + 1]);
        if (![0, 9].includes(y)) newBranch.push([y - 1, x]);
        if (![0, dataMatrix.length - 1].includes(y)) newBranch.push([y + 1, x]);
        newBranch.filter(coord => !basin.includes(coord) && !newLayer.includes(coord));
        if (newBranch.length > 0) newLayer = newLayer.concat(newBranch);
      }
      if (newLayer.length > 0) {
        basin = basin.concat(newLayer);
        currentLayer = [...newLayer];
      } else hasNew = false;
    }
    basins.push(basin);
  }
  let bSizes = basins.map(b => b.length).sort();
  return bSizes[0] * bSizes[1] * bSizes[2];
}

//riskAndSum().then(console.log);
findBasinsAndProd3().then(console.log);
