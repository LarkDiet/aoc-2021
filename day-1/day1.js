//Here we go!!

const data = "day1-data.txt";

fetch(data)
  .then(txt => txt.text())
  .then(str => str.split("\n"))
  .then(parsed => console.log(parsed));
