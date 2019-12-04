'use strict';

// Input: https://adventofcode.com/2019/day/2/input
//const puzzleURL = 'data/test-data.txt';
const puzzleURL = 'data/data.txt';
const result1 = document.querySelector('#result-1');
const result2 = document.querySelector('#result-2');
let input;
const programs = [];

const handleData = data => data.split(',').map(item => parseInt(item));

const restore1202PAS = data => {
  data[1] = 12;
  data[2] = 2;
  return data;
};

const getProgram = data => {
  const workingData = data.slice(0);
  const program = workingData.slice(0,4);
  workingData.splice(0,4);
  const result = {program, workingData};
  return result;
};

const splitProgram = data => {
  if (data[0] !== 99) {
    const newData = getProgram(data);
    programs.push(newData.program);
    splitProgram(newData.workingData);
  }
};

const runIntCode = prog => {
  const [opcode, pos1, pos2, pos3] = prog;
  const value1 = input[pos1];
  const value2 = input[pos2];
  let value3;
  if (opcode === 1) {
    value3 = value1 + value2;
  } else {
    value3 = value1 * value2;
  }
  input[pos3] = value3;
};

const run = intCodes => {
  for (const intCode of intCodes) {
    runIntCode(intCode);
  }
  return input[0];
};


fetch(puzzleURL)
  .then(res => res.text())
  .then(puzzle => {
    input = handleData(puzzle);
    restore1202PAS(input);
    splitProgram(input);

    // Part 1
    result1.innerHTML = run(programs);

    // Part 2
    //result2.innerHTML = calculateTotalRequiredFuel(input);

  });
