import { UnitCounts } from "../types";

export function calcTotalUnitCount(unitCounts: UnitCounts) {
  return Object.values(unitCounts).reduce((acc, cur) => acc + cur, 0);
}
