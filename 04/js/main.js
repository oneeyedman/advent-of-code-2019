'use strict';

const puzzleURL = 'data/data.txt';
const result1 = document.querySelector('#result-1');
const result2 = document.querySelector('#result-2');
let input;

const handleData = data => {
  const [rangeMin, rangeMax] = data.split('-');
  const result=[];
  for (let i=parseInt(rangeMin); i<=parseInt(rangeMax); i++) {
    result.push(i);
  }
  return result;
};

const hasEqualOrAscendingNumbers = number => {
  let result = true;
  const arr = number.toString().split('').map(item => parseInt(item));
  for (let i=0; i<arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      result = false;
      break;
    }
  }
  return result;
};

const removeDescending = pass => hasEqualOrAscendingNumbers(pass);

const removeUniques = pass => pass.toString().length !== pass.toString().match(/([0-9])(?!.*\1)/gi).length;

const getMeetingCriteriaPasswords = data => {
  const result = data
    .filter(removeUniques)
    .filter(removeDescending);
  return result.length;
};


fetch(puzzleURL)
  .then(res => res.text())
  .then(puzzle => {

    input = handleData(puzzle);


    // Part 1
    result1.innerHTML = getMeetingCriteriaPasswords(input);


    // Part 2
    //result2.innerHTML =

  });
