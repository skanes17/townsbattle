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
