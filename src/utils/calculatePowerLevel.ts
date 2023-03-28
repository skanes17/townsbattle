import {
  berserkerAttackBonusPowerLevel,
  fullHealthAttackBonusPowerLevel,
} from ".";
import { Unit } from "../types";

export function totalAttackBonusesPowerLevel(unit: Unit) {
  return (
    fullHealthAttackBonusPowerLevel(unit) + berserkerAttackBonusPowerLevel(unit)
  );
}

export function areaOfEffectDamagePowerLevel(unit: Unit) {
  return (
    (unit.areaOfEffectDamageOnDeath ?? 0) *
      (unit.numberOfUnitsAffectedByAoeDamageOnDeath ?? 0) +
    (unit.damageToOpponentOnDeath ?? 0)
  );
}

export function sumIndividualPowerLevelContributions(
  attack: number,
  health: number,
  armor: number,
  attackBonuses: number,
  deathEffectAndAoeDamage: number,
  threat: number
) {
  return (
    attack + health + armor + attackBonuses + deathEffectAndAoeDamage + threat
  );
}

export function calculatePowerLevel(army: Unit[]) {
  // calculate the army power level (the sum of all the attack, health, and threat levels)
  const {
    totalAttack,
    totalHealth,
    totalArmor,
    totalAttackBonuses,
    totalDeathEffectAndAoeDamage,
    totalThreat,
  } = army.reduce(
    // An arrow function is called for each unit in army
    (totals, unit) => ({
      // For each unit, the arrow function adds the unit's attack, health, and threat to each total
      totalAttack: totals.totalAttack + unit.attack,
      totalHealth: totals.totalHealth + unit.currentHealth,
      totalArmor: totals.totalArmor + unit.armor,
      totalAttackBonuses:
        totals.totalAttackBonuses + totalAttackBonusesPowerLevel(unit),
      totalDeathEffectAndAoeDamage:
        totals.totalDeathEffectAndAoeDamage +
        areaOfEffectDamagePowerLevel(unit),
      totalThreat: totals.totalThreat + unit.threatLevel,
    }),
    // Initilized values for total attack, total health, and total threat
    {
      totalAttack: 0,
      totalHealth: 0,
      totalArmor: 0,
      totalAttackBonuses: 0,
      totalDeathEffectAndAoeDamage: 0,
      totalThreat: 0,
    }
  );

  /* TODO: Consider adding resources into the mix */
  const armyPowerLevel = sumIndividualPowerLevelContributions(
    totalAttack,
    totalHealth,
    totalArmor,
    totalAttackBonuses,
    totalDeathEffectAndAoeDamage,
    totalThreat
  );

  return armyPowerLevel;
}
