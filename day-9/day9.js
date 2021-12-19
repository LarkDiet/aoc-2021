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
    let linkArr = [lp];
    let hasAdj = true;
    while (hasAdj) {
      let linkAdj = linkArr.flatMap(yx => {
        let ma = [dataMatrix[yx[0]][yx[1] - 1], dataMatrix[yx[0]][yx[1] + 1]].filter(v => v != undefined && v != 9);
        if (![0, 9].includes(yx[0])) ma.push(dataMatrix[yx[0] - 1][yx[1]]);
        if (![dataMatrix.length - 1, 9].includes(yx[0])) ma.push(dataMatrix[yx[0] + 1][yx[1]]);
        return ma;
      });
      if (linkAdj.length == 0) hasAdj = false;
      else linkArr = linkArr.concat(linkAdj);
    }
    basins.push(linkArr);
  }
}

riskAndSum().then(console.log);
