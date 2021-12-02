//Day 2

const input = 'day2-data.txt';

async function parseData() {
  let file = await fetch(input);
  let str = await file.text();
  let arr = str.split('\n');
  return arr;
}

async function findHDProd() {
  let dataArr = await parseData();
  let h = 0;
  let d = 0;
  //last value in arr is blank
  for (let i = 0; i < dataArr.length - 1; i++) {
	let x = dataArr[i].split(" ");
    if (x[0].startsWith('forward')) {
		h += parseInt(x[1]);
	}
	if (x[0].startsWith('down')) {
		d += parseInt(x[1]);
	}
	if (x[0].startsWith('up')) {
		d -= parseInt(x[1]);
	}
  }
  return h * d;
}

async function findHDProd2() {
  let dataArr = await parseData();
  let h = 0;
  let d = 0;
  let a = 0;
  //last value in arr is blank
  for (let i = 0; i < dataArr.length - 1; i++) {
	let x = dataArr[i].split(" ");
    if (x[0].startsWith('forward')) {
		h += parseInt(x[1]);
		d += a * parseInt(x[1]);
	}
	if (x[0].startsWith('down')) {
		a += parseInt(x[1]);
	}
	if (x[0].startsWith('up')) {
		a -= parseInt(x[1]);
	}
  }
  return h * d;
}

findHDProd().then(console.log);
findHDProd2().then(console.log);
