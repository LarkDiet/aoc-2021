//Day 11

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-11/sample-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n').filter(l => l);
  return arr;
}

function validAdjacentCoords(matrix, y, x) {
  let arr = [];
  if (matrix[y][x + 1]) arr.push([y, x + 1]);
  if (matrix[y][x - 1]) arr.push([y, x - 1]);
  if (y != 0) {
    arr.push([y - 1, x]);
    if (matrix[y - 1][x + 1]) arr.push([y - 1, x + 1]);
    if (matrix[y - 1][x - 1]) arr.push([y - 1, x - 1]);
  }
  if (y != matrix.length - 1) {
    arr.push([y + 1, x]);
    if (matrix[y + 1][x + 1]) arr.push([y + 1, x + 1]);
    if (matrix[y + 1][x - 1]) arr.push([y + 1, x - 1]);
  }
  return arr;
}

async function findFlashesAfter(days) {
  let dataArr = await parseData();
  let dataMatrix = dataArr.map(l => l.split('').map(v => parseInt(v)));
  let flashCount = 0;
  for (let d = 0; d < days; d++) {
    let flashedCoords = [];
    for (let y = 0; y < dataMatrix.length; y++) {
      for (let x = 0; x < dataMatrix[y].length; x++) {
        dataMatrix[y][x] += 1;
        if (dataMatrix[y][x] > 9) {
          flashedCoords.push([y, x]);
          console.log("Octo at " + [y, x] + "flashed!");
          console.log("Adding 1 to adjacent coords: ");
          for (let coord of validAdjacentCoords(dataMatrix, y, x)) {
            console.log(coord);
            dataMatrix[coord[0]][coord[1]] += 1;
          }
        }
      }
    }
    flashCount += flashedCoords.length;
    for (let fc of flashedCoords)
      dataMatrix[fc[0]][fc[1]] = 0;
  }
  return flashCount;
}

findFlashesAfter(100).then(console.log);
