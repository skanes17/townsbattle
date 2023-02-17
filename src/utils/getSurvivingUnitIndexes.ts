import { Unit } from "../types";

export function getSurvivingUnitIndexes(units: Unit[]) {
  // .reduce() takes a function as its first argument
  // The function takes two arguments: the accumulator (initially an empty array) and the current unit
  // .reduce() returns an array!
  return units.reduce(
    (acc: number[], unit, index) => {
      // If the unit has health remaining, add its index to the accumulator
      if (unit.currentHealth > 0) {
        acc.push(index);
      }
      // Return the updated accumulator to use in next iteration
      return acc;
    },
    // The second argument to .reduce() is the initial value of the accumulator (empty number[])
    []
  );
}
// The resulting array now contains the indexes of all surviving units
