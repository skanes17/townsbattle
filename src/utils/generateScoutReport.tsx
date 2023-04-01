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

  const unitTypesString =
    numberOfDifferentEnemyUnitTypes === 1
      ? "1 unit type"
      : `${numberOfDifferentEnemyUnitTypes} unit types`;

  let scoutReport: string;

  if (relativeSizeOfTheEnemy < 0.5) {
    if (relativePowerOfTheEnemy < 0.5) {
      scoutReport = `Scout's Report: Nothing to fear! The enemy army is much smaller and much less powerful than ours. We spied ${unitTypesString}.`;
    } else if (relativePowerOfTheEnemy < 0.8) {
      scoutReport = `Scout's Report: We have the advantage! The enemy army is much smaller and slightly less powerful than ours. We spied ${unitTypesString}.`;
    } else if (approxSamePower) {
      scoutReport = `Scout's Report: We have the advantage, but be careful! The enemy army is much smaller but about the same power as ours. We spied ${unitTypesString}.`;
    } else if (relativePowerOfTheEnemy < 1.2) {
      scoutReport = `Scout's Report: We have the advantage, but it won't be easy! The enemy army is much smaller but slightly more powerful than ours. We spied ${unitTypesString}.`;
    } else {
      scoutReport = `Scout's Report: Be cautious! The enemy army is much smaller but much more powerful than ours. We spied ${unitTypesString}.`;
    }
  } else if (relativeSizeOfTheEnemy < 0.8) {
    // similar code to previous case, with different flavor text
    if (relativePowerOfTheEnemy < 0.5) {
      scoutReport = `Scout's Report: They're outnumbered! The enemy army is slightly smaller and much less powerful than ours. We spied ${unitTypesString}.`;
    } else if (relativePowerOfTheEnemy < 0.8) {
      scoutReport = `Scout's Report: We have the edge! The enemy army is slightly smaller and slightly less powerful than ours. We spied ${unitTypesString}.`;
    } else if (approxSamePower) {
      scoutReport = `Scout's Report: A close match! The enemy army is slightly smaller but about the same power as ours. We spied ${unitTypesString}.`;
    } else if (relativePowerOfTheEnemy < 1.2) {
      scoutReport = `Scout's Report: It will be tough, but we can do it! The enemy army is slightly smaller but slightly more powerful than ours. We spied ${unitTypesString}.`;
    } else {
      scoutReport = `Scout's Report: This could be difficult! The enemy army is slightly smaller but much more powerful than ours. We spied ${unitTypesString}.`;
    }
  } else if (approxSameSize) {
    // similar code to previous cases, with different flavor text
    if (relativePowerOfTheEnemy < 0.5) {
      scoutReport = `Scout's Report: We're evenly matched, but we have the advantage! The enemy army is about the same size but much less powerful than ours. We spied ${unitTypesString}.`;
    } else if (relativePowerOfTheEnemy < 0.8) {
      scoutReport = `Scout's Report: We're evenly matched, but we can win this! The enemy army is about the same size and slightly less powerful than ours. We spied ${unitTypesString}.`;
    } else if (approxSamePower) {
      scoutReport = `Scout's Report: We're evenly matched! The enemy army is about the same size and power as ours. We spied ${unitTypesString}.`;
    } else if (relativePowerOfTheEnemy < 1.2) {
      scoutReport = `Scout's Report: We're evenly matched, but this will be tough! The enemy army is about the same size but slightly more powerful than ours. We spied ${unitTypesString}.`;
    } else {
      scoutReport = `Scout's Report: We're evenly matched, but they have the advantage! The enemy army is about the same size but much more powerful than ours. We spied ${unitTypesString}.`;
    }
  } else if (relativeSizeOfTheEnemy < 1.2) {
    // similar code to previous cases, with different flavor text
    if (relativePowerOfTheEnemy < 0.5) {
      scoutReport = `Scout's Report: This will be tough, but we can do it! The enemy army is slightly larger but much less powerful than ours. We spied ${unitTypesString}.`;
    } else if (relativePowerOfTheEnemy < 0.8) {
      scoutReport = `Scout's Report: Prepare for battle! The enemy army is slightly larger and slightly less powerful than ours. We spied ${unitTypesString}.`;
    } else if (approxSamePower) {
      scoutReport = `Scout's Report: Prepare for a tough fight! The enemy army is slightly larger but about the same power as ours. We spied ${unitTypesString}.`;
    } else if (relativePowerOfTheEnemy < 1.2) {
      scoutReport = `Scout's Report: This will be a challenge! The enemy army is slightly larger and slightly more powerful than ours. We spied ${unitTypesString}.`;
    } else {
      scoutReport = `Scout's Report: We're in trouble! The enemy army is slightly larger and much more powerful than ours. We spied ${unitTypesString}.`;
    }
  } else {
    // similar code to previous cases, with different flavor text
    if (relativePowerOfTheEnemy < 0.5) {
      scoutReport = `Scout's Report: We're outnumbered, but we have the advantage! The enemy army is much larger but much less powerful than ours. We spied ${unitTypesString}.`;
    } else if (relativePowerOfTheEnemy < 0.8) {
      scoutReport = `Scout's Report: We're outnumbered, but we can win this! The enemy army is much larger and slightly less powerful than ours. We spied ${unitTypesString}.`;
    } else if (approxSamePower) {
      scoutReport = `Scout's Report: We're outnumbered, this will be tough! The enemy army is much larger but about the same power as ours. We spied ${unitTypesString}.`;
    } else if (relativePowerOfTheEnemy < 1.2) {
      scoutReport = `Scout's Report: We're outnumbered and outmatched! The enemy army is much larger and slightly more powerful than ours. We spied ${unitTypesString}.`;
    } else {
      scoutReport = `Scout's Report: We're in trouble! The enemy army is much larger and much more powerful than ours. We spied ${unitTypesString}.`;
    }
  }
  return scoutReport;
}
