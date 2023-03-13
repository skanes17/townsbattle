import { Unit } from "../types";

export function ScoutReport(
  friendlyArmy: Unit[],
  friendlyPowerLevel: number,
  enemyArmy: Unit[],
  enemyPowerLevel: number,
  enemyUnitTypes: number
) {
  const enemyIsTwiceAsLarge = enemyArmy.length > 2 * friendlyArmy.length;
  const enemyIsApproxSameSize =
    Math.abs(enemyArmy.length - friendlyArmy.length) <
    0.1 * friendlyArmy.length;
  const enemyIsHalfSize = enemyArmy.length < 0.5 * friendlyArmy.length;
  const enemyIsTwiceAsPowerful = enemyPowerLevel > friendlyPowerLevel * 2;
  const enemyIsApproxSamePower =
    Math.abs(enemyPowerLevel - friendlyPowerLevel) < 0.1 * friendlyPowerLevel;
  const enemyIsHalfPowerful = enemyPowerLevel < 0.5 * friendlyPowerLevel;

  /* TODO: Add Nested if statements */
  if (enemyIsTwiceAsLarge) {
    return (
      <div>
        Watch out! The enemy army is twice as large as our friendly army!
      </div>
    );
  } else if (enemyIsApproxSameSize) {
    return <div>The enemy army is about the same size as ours.</div>;
  } else if (enemyIsHalfSize) {
    return (
      <div>
        The enemy army is much smaller than ours. We have the advantage!
      </div>
    );
  } else if (enemyIsTwiceAsPowerful) {
    return <div>Danger! The enemy army is much more powerful than ours!</div>;
  } else if (enemyIsApproxSamePower) {
    return <div>The enemy army has a similar power level to ours.</div>;
  } else if (enemyIsHalfPowerful) {
    return (
      <div>
        Our army is much more powerful than the enemy. We have the upper hand!
      </div>
    );
  } else {
    return (
      <div>
        Something went wrong with the army comparison. Please check your input.
      </div>
    );
  }
}

/* 
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
