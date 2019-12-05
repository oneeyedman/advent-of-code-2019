'use strict';

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

const run = (instruction, intcodeProgram) => {
  const [opcode, param1, param2, param3] = instruction;
  const value1 = intcodeProgram[param1];
  const value2 = intcodeProgram[param2];
  let value3 = (opcode === 1) ? value1+value2 : value1*value2;
  intcodeProgram[param3] = value3;
};

const printProgram = codes => {
  let counter = 0;
  let size = 4;

  while (codes[counter] !== 99) {
    const intcode = codes.slice(counter,size);
    run(intcode, codes);
    counter += 4;
    size = counter + 4;
  }
  return(codes[0]);
};

const getNounAndVerbs = () => {
  const result = [];
  for (let i=0; i<=99; i++) {
    for (let j=0; j<=99; j++) {
      result.push({
        noun: i,
        verb: j
      });
    }
  }
  return result;
};

const gravityAssistAroundTheMoon = data => {
  const pairs = getNounAndVerbs();
  let result;

  for (let i=0; i<pairs.length; i++) {
    const program = data.slice(0);
    program[1] = pairs[i].noun;
    program[2] = pairs[i].verb;
    const address0 = printProgram(program);
    if (address0 === output) {
      const {noun, verb} = pairs[i];
      result = 100 * noun + verb;
    }
  }
  return result;
};

fetch(puzzleURL)
  .then(res => res.text())
  .then(puzzle => {

    input = handleData(puzzle);
    const originalInput = input.slice(0);
    restore1202PAS(input);

    // Part 1
    result1.innerHTML = printProgram(input);

    // Part 2
    result2.innerHTML = gravityAssistAroundTheMoon(originalInput);

  });
