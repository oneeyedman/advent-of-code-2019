'use strict';

// Input: https://adventofcode.com/2018/day/1/input
const puzzleURL = 'js/puzzle.json';
const result1 = document.querySelector('#result-1');
const result2 = document.querySelector('#result-2');
const part2Results = [];
let frecuency;

const iBlameCromForThis = (puzzle,initialAcc) => {
  let continueSuffering = true;
  
  const result = puzzle.reduce((acc,i)=>{
    const r = acc+i;
    if (part2Results.includes(r) && continueSuffering) {
      continueSuffering = false;
      frecuency = r;
    }
    part2Results.push(r);
    return r;
  }, initialAcc);

  if (continueSuffering) {
    iBlameCromForThis(puzzle,result);
  } else {
    result2.innerHTML = frecuency;
  }
};

fetch(puzzleURL)
  .then(res => res.json())
  .then(puzzle => {

    // Part 1
    result1.innerHTML = `${puzzle.reduce((acc,i)=>acc+i)}`;

    // Part 2
    iBlameCromForThis(puzzle, 0);

  });
