import { TrainingUnit, Unit, UnitCounts, UnitType } from "../types";

export const countUnits = (
  unitsArray: Unit[],
  unitTypes: UnitType[]
): UnitCounts => {
  const counts: UnitCounts = {};
  for (const unitType of unitTypes) {
    counts[unitType] = unitsArray.filter(
      (unit: Unit) => unit.unitType === unitType
    ).length;
  }
  console.log(counts);
  return counts;
};
