import {
  berserkerAttackBonusPowerLevel,
  fullHealthAttackBonusPowerLevel,
} from ".";
import { Unit } from "../types";

export function calculatePowerLevel(army: Unit[]) {
  // calculate the army power level (the sum of all the attack, health, and threat levels)
  const {
    totalAttack,
    totalHealth,
    totalArmor,
    totalAttackBonus,
    totalThreat,
  } = army.reduce(
    // An arrow function is called for each unit in army
    (totals, unit) => ({
      // For each unit, the arrow function adds the unit's attack, health, and threat to each total
      totalAttack: totals.totalAttack + unit.attack,
      totalHealth: totals.totalHealth + unit.currentHealth,
      totalArmor: totals.totalArmor + unit.armor,
      totalAttackBonus:
        totals.totalAttackBonus +
        fullHealthAttackBonusPowerLevel(unit) +
        berserkerAttackBonusPowerLevel(unit),
      totalThreat: totals.totalThreat + unit.threatLevel,
    }),
    // Initilized values for total attack, total health, and total threat
    {
      totalAttack: 0,
      totalHealth: 0,
      totalArmor: 0,
      totalAttackBonus: 0,
      totalThreat: 0,
    }
  );

  /* TODO: Consider adding resources into the mix */
  const armyPowerLevel =
    totalAttack + totalHealth + totalArmor + totalAttackBonus + totalThreat;

  return armyPowerLevel;
}
