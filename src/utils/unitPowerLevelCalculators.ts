import { berserkerHealthTrigger } from "../gameData";
import { Unit } from "../types";

export function fullHealthAttackBonusPowerLevel(unit: Unit) {
  const powerLevelContribution = Math.floor(
    (unit.fullHealthAttackBonus ?? 0) / 2
  );
  return powerLevelContribution;
}

// if a berserker, take attack when they have a bonus multiplied by the health trigger (e.g. 0.25 if 25% health trigger)
export function berserkerAttackBonusPowerLevel(unit: Unit) {
  let powerLevelContribution;
  const { berserker, attack, berserkerAttackMultiplier } = unit;
  berserker
    ? (powerLevelContribution =
        (attack * (berserkerAttackMultiplier ?? 1) - attack) *
        berserkerHealthTrigger)
    : (powerLevelContribution = 0);
  return powerLevelContribution;
}
