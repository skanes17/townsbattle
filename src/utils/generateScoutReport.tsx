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

/* Use a combo of the below to check; also check edge cases where they're equal
function ArmyComparison({ friendlyArmy, enemyArmy }) {
  const enemyIsTwiceAsPowerful = enemyArmy > friendlyArmy * 2;
  const enemyIsApproxSamePower = Math.abs(enemyArmy - friendlyArmy) < 0.1 * friendlyArmy;
  const enemyIsHalfPowerful = enemyArmy < 0.5 * friendlyArmy;

  if (enemyIsTwiceAsPowerful) {
    if (enemyArmy > 2 * friendlyArmy) {
      return <div>Danger! The enemy army is twice as powerful and twice as large as ours!</div>;
    } else if (Math.abs(enemyArmy - friendlyArmy) < 0.1 * friendlyArmy) {
      return <div>The enemy army is twice as powerful but about the same size as ours.</div>;
    } else if (enemyArmy < 0.5 * friendlyArmy) {
      return <div>The enemy army is twice as powerful but only half as large as ours. We have the advantage!</div>;
    }
  } else if (enemyIsApproxSamePower) {
    if (enemyArmy > 2 * friendlyArmy) {
      return <div>The enemy army is about the same size as ours, but twice as powerful. Beware!</div>;
    } else if (Math.abs(enemyArmy - friendlyArmy) < 0.1 * friendlyArmy) {
      return <div>The enemy army is about the same size and has a similar power level to ours.</div>;
    } else if (enemyArmy < 0.5 * friendlyArmy) {
      return <div>The enemy army is about the same size but only half as large as ours. We have the upper hand!</div>;
    }
  } else if (enemyIsHalfPowerful) {
    if (enemyArmy > 2 * friendlyArmy) {
      return <div>The enemy army is much smaller than ours, but twice as powerful. We must be careful!</div>;
    } else if (Math.abs(enemyArmy - friendlyArmy) < 0.1 * friendlyArmy) {
      return <div>The enemy army is much smaller than ours, but has a similar power level to ours. We have a significant advantage!</div>;
    } else if (enemyArmy < 0.5 * friendlyArmy) {
      return <div>The enemy army is much smaller and only half as powerful as ours. We have a decisive advantage!</div>;
    }
  } else {
    return <div>Something went wrong with the army comparison. Please check your input.</div>;
  }
}
 */

/*
const enemyIsTwiceAsLarge = enemyArmy > 2 * friendlyArmy;
const enemyIsApproxSameSize =
  Math.abs(enemyArmy - friendlyArmy) < 0.1 * friendlyArmy;
const enemyIsHalfSize = enemyArmy < 0.5 * friendlyArmy;
const enemyIsTwiceAsPowerful = enemyArmy > friendlyArmy * 2;
const enemyIsApproxSamePower =
  Math.abs(enemyArmy - friendlyArmy) < 0.1 * friendlyArmy;
const enemyIsHalfPowerful = enemyArmy < 0.5 * friendlyArmy;
*/
