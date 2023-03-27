import { calculatedAttackValue } from ".";
import { Unit } from "../types";

export function damageAndReturnNewHealth(
  currentHealthOfUnitOrBuilding: number,
  damageDoneToIt?: number
) {
  return Math.max(0, currentHealthOfUnitOrBuilding - (damageDoneToIt ?? 0));
}
