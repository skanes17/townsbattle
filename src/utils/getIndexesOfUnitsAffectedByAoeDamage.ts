import { Unit } from "../types";

export function getIndexesOfUnitsAffectedByAoeDamage(
  destroyedUnit: Unit,
  opposingUnit: Unit,
  opposingArmy: Unit[],
  survivingOpposingUnitIndexes: number[]
) {
  // defeated unit does area of effect damage to opposing army on death
  // don't include the opposing unit in the AoE damage
  const survivingUnitIndexesExcludingSelectedFriendly = [
    ...survivingOpposingUnitIndexes,
  ].filter(
    (survivingUnitIndex) => opposingArmy[survivingUnitIndex] !== opposingUnit
  );

  const numberOfUnitsToBeDamaged =
    destroyedUnit.numberOfUnitsAffectedByAoeDamageOnDeath ?? 0;

  const indexesOfUnitsAffectedByAoeDamage: number[] = [];
  // Fill an array with the required number of unique unit indices from the appropriate army to be damaged
  while (
    survivingUnitIndexesExcludingSelectedFriendly.length > 0 &&
    indexesOfUnitsAffectedByAoeDamage.length < numberOfUnitsToBeDamaged
  ) {
    const randomIndex = Math.floor(
      Math.random() * survivingUnitIndexesExcludingSelectedFriendly.length
    );
    indexesOfUnitsAffectedByAoeDamage.push(
      survivingUnitIndexesExcludingSelectedFriendly.splice(randomIndex, 1)[0]
    );
  }
  return indexesOfUnitsAffectedByAoeDamage;
}
