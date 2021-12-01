//Here we go!!

const data = "day1-data.txt";
var arr = [];
var count = 0;

fetch (data)
  .then(txt => txt.text())
  .then(str => arr = str.split("\n"));

for (let i = 1; i < arr.length - 1; i++) {
  if (arr[i] > arr[i - 1]) count++;
}

console.log("Result: " + count);
