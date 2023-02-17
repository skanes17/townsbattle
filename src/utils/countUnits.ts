import { Unit, UnitCounts, UnitType } from "../types";

export function countUnits(
  unitsArray: Unit[],
  unitTypes: UnitType[]
): UnitCounts {
  const counts: UnitCounts = {};
  for (const unitType of unitTypes) {
    counts[unitType] = unitsArray.filter(
      (unit: Unit) => unit.unitType === unitType
    ).length;
  }
  return counts;
}
