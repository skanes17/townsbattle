import { Unit } from "../types";
import { berserkBonusCheck, fullHealthBonusCheck } from "./attackBonusCheck";

export enum AttackValueType {
  card,
  toEnemy,
}

export const calculatedAttackValue = (
  attackValueType: AttackValueType,
  attacker: Unit,
  defender?: Unit
): number => {
  // used destructuring to make code more readable
  const {
    attack,
    fullHealthAttackBonus,
    // chargingMultiplier,
    berserkerAttackMultiplier,
  } = attacker;
  // if unit has full health, or charges before being selected, it does bonus attack damage
  let attackBonus = 0;

  // full health bonus
  if (fullHealthBonusCheck(attacker)) {
    attackBonus += fullHealthAttackBonus ?? 0;
  }

  // if berserker and they've low enough health (below health trigger)
  if (berserkBonusCheck(attacker)) {
    attackBonus += Math.floor(
      attack * (berserkerAttackMultiplier ?? 1) - attack
    );
  }

  switch (attackValueType) {
    case AttackValueType.card:
      return attack + attackBonus;
    case AttackValueType.toEnemy:
      // armor reduces incoming attack damage
      // Math.max() prevents negative attack values due to high armor
      return Math.max(0, attack + attackBonus - (defender?.armor ?? 0));
  }
};
