//Day 5

const input = 'https://raw.githubusercontent.com/LarkDiet/aoc-2021/main/day-5/day5-data.txt';

async function parseData() {
    let file = await fetch(input);
    let str = await file.text();
    let arr = str.split('\n').filter(l => l);
    return arr;
}

//This function is designed for solving part 2, when diagonals are accounted for
//For part 1, uncomment the if statement below
async function findLines() {
    let dataArr = await parseData();
    let hvLines = [];
    for (let i = 0; i < dataArr.length; i++) {
        let coords = dataArr[i].split(/\D/g).filter(v => v);
        let x1 = coords[0];
        let y1 = coords[1];
        let x2 = coords[2];
        let y2 = coords[3];
        /*if (x1 == x2 || y1 == y2)*/ hvLines.push(coords.map(v => parseInt(v)));
    }
    return hvLines;
}

function isOnLine(point, line) {
    //If horizontal
    if (line[1] == line[3] && point[1] == line[1] && point[0] <= Math.max(line[0], line[2]) && point[0] >= Math.min(line[0], line[2])) {
        return true;
    }
    //If vertical
    if (line[0] == line[2] && point[0] == line[0] && point[1] <= Math.max(line[1], line[3]) && point[1] >= Math.min(line[1], line[3])) {
        return true;
    }
    //If diagonal
    if (Math.abs(line[0] - point[0]) == Math.abs(line[1] - point[1]) && point[0] <= Math.max(line[0], line[2]) && point[0] >= Math.min(line[0], line[2]) && point[1] <= Math.max(line[1], line[3]) && point[1] >= Math.min(line[1], line[3])) {
        return true;
    }
    return false;
}

function collisionCount(point, lineArr) {
    let count = 0;
    for (let line of lineArr) {
        if (isOnLine(point, line)) count++;
    }
    return count;
}

async function findOverlaps() {
    let lines = await findLines();
    let allPoints = [];
    let ovCount = 0;
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;
    for (let line of lines) {
        let lineX1 = line[0];
        let lineY1 = line[1];
        let lineX2 = line[2];
        let lineY2 = line[3];
        minX = Math.min(minX, lineX1, lineX2);
        minY = Math.min(minY, lineY1, lineY2);
        maxX = Math.max(maxX, lineX1, lineX2);
        maxY = Math.max(maxY, lineY1, lineY2);
    }
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            if (collisionCount([x, y], lines) >= 2) ovCount++;
        }
    }
    return ovCount;
}

findOverlaps().then(console.log);
