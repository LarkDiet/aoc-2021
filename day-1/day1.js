//Here we go!!

const input = 'day1-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n');
  return arr;
}

async function findIncCount() {
  let dataArr = await parseData();
  let count = 0;
  //last value in arr is blank
  for (let i = 1; i < dataArr.length - 1; i++) {
    if (parseInt(dataArr[i]) > parseInt(dataArr[i - 1])) count++;
  }
  return count;
}

async function findWinIncCount() {
  let dataArr = await parseData();
  let count = 0;
  //last value in arr is blank
  for (let i = 3; i < dataArr.length - 1; i++) {
    if (parseInt(dataArr[i]) > parseInt(dataArr[i - 3])) count++;
  }
  return count;
}

findIncCount().then(console.log);
findWinIncCount().then(console.log);
