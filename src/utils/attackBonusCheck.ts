import { berserkerHealthTrigger } from "../gameData";
import { Unit } from "../types";

export function fullHealthBonusCheck(unit: Unit) {
  const { fullHealthBonus, currentHealth, maxHealth } = unit;
  const fullHealthAttackBonusActive =
    fullHealthBonus && currentHealth === maxHealth;
  return fullHealthAttackBonusActive;
}

export function berserkBonusCheck(unit: Unit) {
  const { currentHealth, maxHealth } = unit;
  // unit is alive and it's below a critical health point
  const berserkCheckAttackBonusActive =
    currentHealth > 0 && currentHealth / maxHealth <= berserkerHealthTrigger;
  return berserkCheckAttackBonusActive;
}

export function allAttackBonusesCheck(unit: Unit) {
  const hasAttackBonus = fullHealthBonusCheck(unit) || berserkBonusCheck(unit);
  return hasAttackBonus;
}
