//Day 11
//Idk how this works on pt 2 but it does?? See console logs

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-11/day11-data.txt';
//const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-11/sample-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n').filter(l => l);
  return arr;
}

function validAdjacentCoords(matrix, coord) {
  let y = coord[0];
  let x = coord[1];
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

const includesArray = (data, arr) => {
  return data.some(e => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o)));
}

async function findFlashesAfter(days) {
  let dataArr = await parseData();
  let dataMatrix = dataArr.map(l => l.split('').map(v => parseInt(v)));
  let flashCount = 0;
  let prevCount = 0;
  console.log("Day 0:\n\n" + dataMatrix.join('\n'));
  for (let d = 0; d < days; d++) {
    let flashedCoords = [];
    dataMatrix = dataMatrix.map((y, yi) => y.map((v, vi) => {
      if (v == 9) {
        flashedCoords.push([yi, vi]);
        return 0;
      } else return v + 1;
    }));
    if (flashedCoords.length > 0) {
      for (let flash of flashedCoords) {
        let moreFlashes = [];
        for (let vac of validAdjacentCoords(dataMatrix, flash)) {
          if (!includesArray(flashedCoords, vac) && !includesArray(moreFlashes, vac)) {
            dataMatrix[vac[0]][vac[1]] += 1;
            if (dataMatrix[vac[0]][vac[1]] > 9) {
              moreFlashes.push(vac);
              dataMatrix[vac[0]][vac[1]] = 0;
            }
          }
        }
        flashedCoords = flashedCoords.concat(moreFlashes);
        if (moreFlashes.length > 0) {
          while (true) {
            let allNewFlashes = [];
            for (let flash of moreFlashes) {
              let evenMoreFlashes = [];
              for (let vac of validAdjacentCoords(dataMatrix, flash)) {
                if (!includesArray(flashedCoords, vac) && !includesArray(evenMoreFlashes, vac)) {
                  dataMatrix[vac[0]][vac[1]] += 1;
                  if (dataMatrix[vac[0]][vac[1]] > 9) {
                    evenMoreFlashes.push(vac);
                    dataMatrix[vac[0]][vac[1]] = 0;
                  }
                }
              }
              allNewFlashes = allNewFlashes.concat(evenMoreFlashes);
            }
            flashedCoords = flashedCoords.concat(allNewFlashes);
            moreFlashes = [...allNewFlashes];
            if (moreFlashes.length == 0) break;
          }
        }
      }
    }
    console.log("Day " + (d + 1) + ":\n\n" + dataMatrix.join('\n'));
    flashCount += flashedCoords.length;
    if (flashCount - prevCount == 100) {
    	console.log("All octos synced! Stopping!");
      return d + 1;
    }
    prevCount = flashCount;
    console.log("Octos flashed at: " + flashedCoords.map(fc => "(" + fc + ")"));
    console.log("Total flashes over time: " + flashCount);
  }
  return flashCount;
}

//findFlashesAfter(100).then(console.log);
findFlashesAfter(10000).then(console.log);
