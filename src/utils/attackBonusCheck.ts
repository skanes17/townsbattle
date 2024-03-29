import { berserkerHealthTrigger } from "../gameData";
import { Unit } from "../types";

export function fullHealthBonusCheck(unit: Unit) {
  const { fullHealthBonus, currentHealth, maxHealth } = unit;
  const fullHealthAttackBonusActive =
    fullHealthBonus && currentHealth === maxHealth;
  return fullHealthAttackBonusActive;
}

export function berserkBonusCheck(unit: Unit) {
  const { currentHealth, maxHealth, berserker } = unit;
  // unit is alive and it's below a critical health point
  const berserkCheckAttackBonusActive =
    berserker &&
    currentHealth > 0 &&
    currentHealth / maxHealth <= berserkerHealthTrigger;
  return berserkCheckAttackBonusActive;
}

export function aoeDamageOnDeathActiveCheck(unit: Unit) {
  const aoeDamageOnDeathActive =
    unit.doesAreaOfEffectDamageOnDeath && unit.currentHealth === 0;
  return aoeDamageOnDeathActive;
}

export function allAttackBonusesCheck(unit: Unit) {
  const hasAttackBonus = fullHealthBonusCheck(unit) || berserkBonusCheck(unit);
  return hasAttackBonus;
}
