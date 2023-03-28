import { Building, Unit } from "../types";
import {
  aoeDamageOnDeathActiveCheck,
  berserkBonusCheck,
  fullHealthBonusCheck,
} from "./attackBonusCheck";

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

export enum typeOfDamageOnDeath {
  Direct,
  AoE,
}

export const calculateNewHealthAfterDamagedByDyingUnit = (
  type: typeOfDamageOnDeath.Direct | typeOfDamageOnDeath.AoE,
  unitBeingDamaged: Unit,
  dyingUnit: Unit
): number => {
  let damageValue: number;
  switch (type) {
    case typeOfDamageOnDeath.Direct:
      damageValue = dyingUnit.damageToOpponentOnDeath ?? 0;
      break;
    case typeOfDamageOnDeath.AoE:
      damageValue = dyingUnit.areaOfEffectDamageOnDeath ?? 0;
      break;
  }

  const { currentHealth, armor } = unitBeingDamaged;
  // this calculation catches numbers below 0 as well as numbers exceeding original health
  const newHealthAfterDamage = Math.min(
    currentHealth,
    Math.max(0, currentHealth + armor - damageValue)
  );

  return newHealthAfterDamage;
};

/* 
This calculation finds the new health of a character after taking damage.
The expression currentHealth + armor - damageValue calculates the
effective health of the character after taking damage and considering
the armor value. If the result of this calculation is negative,
it means that the character's health is reduced to zero, because the
damage taken is greater than the sum of the character's current health
and armor.
To handle this case, we use Math.max(0, currentHealth + armor - damageValue)
to ensure that the effective health cannot be negative.
Then, Math.min is used to compare the calculated effective health with the
character's current health and return the minimum value of the two. This is
because the effective health cannot be greater than the current health of
the character. The result of Math.min is the final effective health of
the character after taking damage, considering the armor value.
*/
