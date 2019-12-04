'use strict';

// Input: https://adventofcode.com/2019/day/2/input
//const puzzleURL = 'data/test-data.txt';
const puzzleURL = 'data/data.txt';
const result1 = document.querySelector('#result-1');
const result2 = document.querySelector('#result-2');
let input;
const output = 19690720;

const handleData = data => data.split(',').map(item => parseInt(item));

const restore1202PAS = data => {
  data[1] = 12;
  data[2] = 2;
};

const run = instruction => {
  const [opcode, param1, param2, param3] = instruction;
  const value1 = input[param1];
  const value2 = input[param2];
  let value3 = (opcode === 1) ? value1+value2 : value1*value2;
  input[param3] = value3;
};

const printProgram = codes => {
  let counter = 0;
  let size = 4;

  while (codes[counter] !== 99) {
    const intcode = codes.slice(counter,size);
    run(intcode);
    counter += 4;
    size = counter + 4;
  }
  return(input[0]);
};


fetch(puzzleURL)
  .then(res => res.text())
  .then(puzzle => {

    input = handleData(puzzle);
    restore1202PAS(input);
    //const originalInput = input.slice(0);

    printProgram(input);

    // Part 1
    result1.innerHTML = printProgram(input);

    // Part 2
    //result2.innerHTML = calculateTotalRequiredFuel(input);

  });
