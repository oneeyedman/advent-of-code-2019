'use strict';

const puzzleURL = 'data/data.txt';
const result1 = document.querySelector('#result-1');
const result2 = document.querySelector('#result-2');
let input;
let route1;
let route2;
let crossroads;

const initialPosition = () => {
  return {
    x: 1,
    y: 1
  };
};

let position = initialPosition();

const handleData = data => data.split('\n');

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

const makeMove = (arr,dir, amount) => {
  const increment = 1;
  const multiplier = {
    U: 1,
    D: -1,
    R: 1,
    L: -1
  };
  for (let i=0; i<amount;i++) {
    if (dir === 'U' || dir === 'D') {
      position.y += increment * multiplier[dir];
    } else {
      position.x += increment * multiplier[dir];
    }
    arr.push(`${position.x},${position.y}`);
  }
};

const tracePath = path => {
  position = initialPosition();
  const steps = path.split(',');
  const route = [];
  route.push(`${position.x},${position.y}`);

  for (const step of steps) {
    const move = extractMove(step);
    const {dir, amount} = move;
    makeMove(route,dir,amount);
  }
  return route;
};

const manhattanDistance =  (a,b) => {
  const x = Math.abs(a.x - b.x);
  const y = Math.abs(a.y - b.y);
  return x+y;
};

const addMDistance = coord => {
  const [x,y] = coord.split(',');
  return {
    x: x,
    y: y,
    md: manhattanDistance({x:1,y:1},{x:x, y:y})
  };
};

const getCloserItem = (item, acc) => {
  if (item.md <= acc.md) {
    return item;
  } else {
    return acc;
  }
};

const getCloserDistance = route => {
  return route
    .map(addMDistance)
    .reduce(getCloserItem);
};

const getCloserWiresCross = data => {
  const [path1, path2] = data;
  route1 = tracePath(path1);
  route2 = tracePath(path2);
  const setRoute2 = new Set(route2);
  crossroads = route1.filter(item => setRoute2.has(item)).filter(item => item !== '1,1');
  const distance = getCloserDistance(crossroads);
  return distance.md;
};

const getCombinedSteps = x => {
  const steps1 = route1.indexOf(x);
  const steps2 = route2.indexOf(x);
  return {
    coord: x,
    steps: steps1 + steps2
  };
};

const getShorterCross = (item, acc) => {
  if (item.steps <= acc.steps) {
    return item;
  } else {
    return acc;
  }
};

const getNumberOfSteps = crosses => {
  const result = crosses
    .map(getCombinedSteps)
    .reduce(getShorterCross);
  return result.steps;
};

fetch(puzzleURL)
  .then(res => res.text())
  .then(puzzle => {

    input = handleData(puzzle);

    // Part 1
    result1.innerHTML = getCloserWiresCross(input); //1285


    // Part 2
    result2.innerHTML = getNumberOfSteps(crossroads);

  });
