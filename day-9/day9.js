//Day 9

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-9/day9-data.txt';

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

const includesArray = (data, arr) => {
  return data.some(e => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o)));
}

async function findBasinsAndProd3() {
  let dataArr = await parseData();
  let dataMatrix = dataArr.map(l => l.split('').map(v => parseInt(v)));
  let lpArr = await findLows();
  let basins = [];
  //For each low point, init a new array of basin coords starting with itself
  //Then make and concat a temporary array for each adjacent coordinate
  //Finally, repeat for each coord adjacent to /those/ coords
  //Until there are no more that meet these conditions:
  //-Does not collide with coords already in the basin array
  //-Does not collide with other "adjacent of adjacent" coords
  //-Does not have a value of 9 in the data matrix
  //For the sanity of anyone reviewing this, console logs have been left in.
  //This takes a minute or two to finish on the actual puzzle data input. Enjoy.
  for (let lp of lpArr) {
    let basinCoords = [lp];
    let adjCoords = [];
    let y = lp[0];
    let x = lp[1];
    if (dataMatrix[y][x - 1] != undefined) adjCoords.push([y, x - 1]);
    if (dataMatrix[y][x + 1] != undefined) adjCoords.push([y, x + 1]);
    if (y != 0) adjCoords.push([y - 1, x]);
    if (y != dataMatrix.length - 1) adjCoords.push([y + 1, x]);
    adjCoords = adjCoords.filter(ac => dataMatrix[ac[0]][ac[1]] != 9);
    basinCoords = basinCoords.concat(adjCoords);
    console.log("Initial basin for lp " + lp + ": ");
    console.log(basinCoords);
    //Heck loop
    let loop = true;
    while (loop = true) {
      let newAdjCoords = [];
      for (let adjc of adjCoords) {
        let adjToAdjCoords = [];
        let acy = adjc[0];
        let acx = adjc[1];
        if (dataMatrix[acy][acx - 1] != undefined) adjToAdjCoords.push([acy, acx - 1]);
        if (dataMatrix[acy][acx + 1] != undefined) adjToAdjCoords.push([acy, acx + 1]);
        if (acy != 0) adjToAdjCoords.push([acy - 1, acx]);
        if (acy != dataMatrix.length - 1) adjToAdjCoords.push([acy + 1, acx]);
        adjToAdjCoords = adjToAdjCoords.filter(ac => !includesArray(newAdjCoords, [ac[0], ac[1]]) && !includesArray(basinCoords, [ac[0], ac[1]]) && dataMatrix[ac[0]][ac[1]] != 9);
        newAdjCoords = newAdjCoords.concat(adjToAdjCoords);
      }
      basinCoords = basinCoords.concat(newAdjCoords);
      console.log("Basin for " + lp + ": ");
      console.log(basinCoords);
      adjCoords = [...newAdjCoords];
      console.log("New adj coords: ");
      console.log(adjCoords);
      if (adjCoords.length == 0) {
      	basins.push(basinCoords);
      	break;
      }
    }
  }
  for (let basin of basins) console.log(basin);
  basins.sort((a,b) => b.length - a.length);
  console.log("Sorted by length descending: ");
  for (let basin of basins) console.log(basin);
  console.log("Product of largest 3: ");
  return (basins[0].length * basins[1].length * basins[2].length);
}

//riskAndSum().then(console.log);
findBasinsAndProd3().then(console.log);
