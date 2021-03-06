//Day 4

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-4/day4-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n');
  arr.pop();
  return arr;
}

async function createBoards() {
  let dataArr = await parseData();
  let boards = [];
  let mat = [];
  for (let i = 2; i < dataArr.length; i++) {
    if (dataArr[i]) mat.push(dataArr[i].split(' ').filter(v => v));
    else {
      boards.push(mat);
      mat = [];
    }
  }
  boards.push(mat);
  return boards;
}

//To win, all values in a single row/column must be part of the pool
function checkWin(matrix, pool) {
	let rows = matrix;
  let cols = [];
  for (let i = 0; i < 5; i++) {
    cols.push([matrix[0][i], matrix[1][i], matrix[2][i], matrix[3][i], matrix[4][i]]);
  }

  for (let row of rows) {
    if (row.every(v => pool.includes(v))) return true;
  }

  for (let column of cols) {
  	if (column.every(v => pool.includes(v))) return true;
  }
  
  return false;
}

async function findFirstWinScore() {
  let dataArr = await parseData();
  let drawList = dataArr[0].split(',');
  let currentDraws = drawList.slice(0, 5); //Preload with first 4 nums
  let boards = await createBoards();
  for (let i = 5; i < drawList.length; i++) {
    currentDraws.push(drawList[i]);
    for (let b = 0; b < boards.length; b++) {
      if (checkWin(boards[b], currentDraws)) {
        let unmarkedSum = boards[b].flat().filter(v => !currentDraws.includes(v)).map(s => parseInt(s)).reduce((pv, cv) => pv + cv, 0);
        return unmarkedSum * currentDraws[i];
      }
    }
  }
  return "No winner";
}

async function findLastWinScore() {
  let dataArr = await parseData();
  let drawList = dataArr[0].split(',');
  let currentDraws = drawList.slice(0, 5); //Preload with first 4 nums
  let boards = await createBoards();
  let winners = [];
  let lastWinDraw;
  for (let i = 5; i < drawList.length; i++) {
    currentDraws.push(drawList[i]);
    for (let b = 0; b < boards.length; b++) {
      if (checkWin(boards[b], currentDraws) && !winners.includes(boards[b])) {
        winners.push(boards[b]);
        lastWinDraw = currentDraws[i];
      }
    }
  }
  let pool = currentDraws.slice(0, currentDraws.indexOf(lastWinDraw) + 1);
  let unmarkedSum = winners.slice(-1).flat(Infinity).filter(v => !pool.includes(v)).map(s => parseInt(s)).reduce((pv, cv) => pv + cv, 0);
  return unmarkedSum * lastWinDraw;
}

findFirstWinScore().then(console.log);
findLastWinScore().then(console.log);
