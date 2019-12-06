'use strict';

const puzzleURL = 'data/data.txt';
const visualgrid = document.querySelector('.grid');
const result1 = document.querySelector('#result-1');
const result2 = document.querySelector('#result-2');
let input;
let position = {
  x: 1,
  y: 1
};

const handleData = data => data.split(',').map(item => parseInt(item));

const fillBlock = (x,y,char) => {
  grid[y][x] = char;
};

const fillGrid = (size, block) => {
  const cols = [];
  for (let y=size; y>=0; y--) {
    const row = [];
    for (let x=0; x<=size;x++) {
      row[x] = block;
    }
    cols[y] = row;
  }
  return cols;
};

const paintGrid = arr => {
  const result = arr.slice(0).flat();

  let gridItems = '';
  for (const r of result) {

    gridItems += `<div class="grid__item ${(r === '·' ? 'grid__item--point':'')}">${r}</div>`;
  }
  visualgrid.innerHTML = gridItems;
};

const extractNumber = str => {
  let result = str.match(/\d/g);
  return parseInt(result.join(''));
};

const extractMove = str => {
  const direction = str[0];
  const amount = extractNumber(str);
  return {
    dir: direction,
    amount: amount
  };
};

const getChar = (dir,last) => {
  const chars = {
    U: '|',
    D: '|',
    R: '-',
    L: '-'
  };
  const result = last ? '+': chars[dir];
  return result;
}

const makeMove = (arr,dir, amount) => {
  let increment = 1;
  for (let i=0; i<amount;i++) {
    const char = getChar(dir, i===amount-1);
    if (dir === 'U') {
      position.y += increment;
    } else if (dir === 'D') {
      position.y += -increment;
    } else if (dir === 'L') {
      position.x += -increment;
    } else {
      position.x += increment;
    }
    arr.push(`${position.x},${position.y}`);
    console.log(`${position.x},${position.y}`);
    fillBlock(position.x,position.y,char);
  }
};


const tracePath = path => {
  const steps = path.split(',');
  const route = [];
  route.push(`${position.x},${position.y}`);
  console.log(`${position.x},${position.y}`);

  for (const step of steps) {
    const move = extractMove(step);
    const {dir, amount} = move;
    makeMove(route,dir,amount);
  }

}

const grid  = fillGrid(10,'·');

fillBlock(1,1,'o');
tracePath('U7,R6,D4,L4');

paintGrid(grid);


fetch(puzzleURL)
  .then(res => res.text())
  .then(puzzle => {

    input = handleData(puzzle);

    // Part 1
    //result1.innerHTML = ;

    // Part 2
    //result2.innerHTML = ;

  });
