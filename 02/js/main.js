'use strict';

// Input: https://adventofcode.com/2019/day/1/input
const puzzleURL = 'data/test-data.txt';
const result1 = document.querySelector('#result-1');
const result2 = document.querySelector('#result-2');

const handleData = data => data.split(',').map(item => parseInt(item));

const restore1202PAS = data => {
  data[1] = 12;
  data[2] = 2;
  return data;
}

fetch(puzzleURL)
  .then(res => res.text())
  .then(puzzle => {
    const input = handleData(puzzle);
    const gravityAssistProgram = restore1202PAS(input);


    console.log(input);
    console.log(gravityAssistProgram);

    // Part 1
    //result1.innerHTML = calculateRequiredFuel(input);

    // Part 2
    //result2.innerHTML = calculateTotalRequiredFuel(input);

  });
