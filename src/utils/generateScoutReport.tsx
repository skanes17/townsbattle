import { Unit } from "../types";

export function generateScoutReport(
  friendlyArmy: Unit[],
  friendlyPowerLevel: number,
  enemyArmy: Unit[],
  enemyPowerLevel: number
) {
  // If the denominator is zero, just calculate as if the denominator is 1.
  const relativeSizeOfTheEnemy = isNaN(enemyArmy.length / friendlyArmy.length)
    ? enemyArmy.length
    : enemyArmy.length / friendlyArmy.length;
  const relativePowerOfTheEnemy = isNaN(enemyPowerLevel / friendlyPowerLevel)
    ? enemyPowerLevel
    : enemyPowerLevel / friendlyPowerLevel;

  const approxSamePower = Boolean(
    Math.abs(enemyPowerLevel - friendlyPowerLevel) < 0.25 * friendlyPowerLevel
  );
  const approxSameSize = Boolean(
    Math.abs(enemyArmy.length - friendlyArmy.length) <
      0.25 * friendlyArmy.length
  );

  const enemyUnitTypes = enemyArmy.map((unit) => unit.unitType);
  const numberOfDifferentEnemyUnitTypes = new Set(enemyUnitTypes).size;

  const scoutReport = {
    relativeSizeOfTheEnemy,
    relativePowerOfTheEnemy,
    numberOfDifferentEnemyUnitTypes,
    approxSamePower,
    approxSameSize,
  };

  return scoutReport;
}
