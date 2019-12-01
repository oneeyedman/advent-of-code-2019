'use strict';

// Input: https://adventofcode.com/2019/day/1/input
const puzzleURL = 'data/data.txt';
const result1 = document.querySelector('#result-1');
const result2 = document.querySelector('#result-2');

const arrToFuel = (fuel, acc) => fuel + acc;

const calculateRequiredFuelPerMass = mass => Math.floor(mass/3) - 2;

const calculateRequiredFuel = samples => samples.map(moduleMass => calculateRequiredFuelPerMass(moduleMass)).reduce(arrToFuel);

const calculateExtraFuel = totalFuel => {
  const extraFuel = [];
  let fuel = calculateRequiredFuelPerMass(totalFuel);
  while (fuel > 0) {
    extraFuel.push(fuel);
    fuel = calculateRequiredFuelPerMass(fuel);
  }
  return extraFuel.reduce(arrToFuel);
};

const calculateTotalRequiredFuel = samples => {
  const result = samples.map(sample => calculateExtraFuel(sample)).reduce(arrToFuel);
  return result;
};

fetch(puzzleURL)
  .then(res => res.text())
  .then(puzzle => {
    const input = puzzle.split('\n');

    // Part 1
    result1.innerHTML = calculateRequiredFuel(input);

    // Part 2
    result2.innerHTML = calculateTotalRequiredFuel(input);

  });
