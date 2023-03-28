import { AttackValueType, calculatedAttackValue } from ".";
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
