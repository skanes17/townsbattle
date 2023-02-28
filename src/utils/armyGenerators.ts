/* Used to produce randomly distributed army compositions */
export const generateRandomArmyComposition = (
  numberOfUnitTypes: number
  // FIXME: Find workaround to not have to use weightOfOneUnitType here
) => {
  // create an array of the correct size and fill it with random numbers
  const randomNumbers = Array(numberOfUnitTypes)
    .fill(null)
    .map(() => Math.random());
  // get the sum of those numbers
  const sum = randomNumbers.reduce((a, b) => a + b, 0);
  // divide each element by their sum -- they're now a prob. distribution
  const armyComposition = randomNumbers.map((n) => n / sum);
  return armyComposition;
};

/* Used to produce semi-randomly distributed army compositions */
/* TODO: Allow choice of unit to be weighted */
export const generateWeightedArmyComposition = (
  numberOfUnitTypes: number,
  weightOfOneUnitType: number
) => {
  // set one unit to have the chosen weight
  let army = [weightOfOneUnitType];
  // the rest of the units share the remaining weight
  let remainingWeight = 1 - weightOfOneUnitType;
  // generate a weight for every remaining unit type
  for (let i = 0; i < numberOfUnitTypes - 2; i++) {
    // generates a random weight
    let randomUnitWeight = Math.random() * remainingWeight;
    // pushes it into the array
    army.push(randomUnitWeight);
    // decrease the remaining weight
    remainingWeight -= randomUnitWeight;
  }
  // push the final remaining weight into the array
  army.push(remainingWeight);
  // shuffle the unit weights -- not truly random, but close enough
  army.sort(() => Math.random() - 0.5);
  return army;
};
