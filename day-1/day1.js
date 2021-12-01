//Here we go!!

const data = "day1-data.txt";

fetch(data)
  .then(x => x.text())
  .then(y => console.log(y));
