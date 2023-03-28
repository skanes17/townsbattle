import {
  AttackValueType,
  calculatedAttackValue,
  calculateNewHealthAfterDamagedByDyingUnit,
  typeOfDamageOnDeath,
} from ".";
import { Unit } from "../types";

export function damageUnitAndReturnNewHealth(defender: Unit, attacker: Unit) {
  const currentHealthOfUnitOrBuilding = defender.currentHealth;
  const incomingAttackValue = calculatedAttackValue(
    AttackValueType.toEnemy,
    attacker,
    defender
  );

  const newHealthOfDefender = Math.max(
    0,
    currentHealthOfUnitOrBuilding - (incomingAttackValue ?? 0)
  );
  return newHealthOfDefender;
}

export function simpleDamageFloorFunction(
  currentHealthOfDefender: number,
  damageDoneToIt?: number
) {
  return Math.max(0, currentHealthOfDefender - (damageDoneToIt ?? 0));
}

export function damageUnitsWithAoe(
  indexesOfUnitsAffectedByAoeDamage: number[],
  damagedArmy: Unit[],
  destroyedUnit: Unit
) {
  for (const index of indexesOfUnitsAffectedByAoeDamage) {
    const unitToBeDamagedByAoe = damagedArmy[index];

    unitToBeDamagedByAoe.currentHealth =
      calculateNewHealthAfterDamagedByDyingUnit(
        typeOfDamageOnDeath.AoE,
        unitToBeDamagedByAoe,
        destroyedUnit
      );
  }
}
