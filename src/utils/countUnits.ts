import { Unit, UnitCounts, UnitType } from "../types";

export function countUnits(
  units: Unit[],
  unitTypes: UnitType[],
  countType: "army" | "injured" | "defeated"
): UnitCounts {
  const counts: UnitCounts = {};
  let total = 0;
  switch (countType) {
    case "army":
      for (const unitType of unitTypes) {
        counts[unitType] = units.filter(
          // used destructuring to avoid accessing the counts object repeatedly
          // renamed unitType to type to avoid conflicts
          ({ unitType: type }) => type === unitType
        ).length;
      }
      break;
    case "injured":
      for (const unitType of unitTypes) {
        counts[unitType] = units.filter(
          ({ unitType: type, currentHealth, maxHealth }) =>
            type === unitType &&
            currentHealth !== 0 &&
            currentHealth < maxHealth
        ).length;
      }
      total = units.filter(
        ({ currentHealth, maxHealth }) =>
          currentHealth > 0 && currentHealth < maxHealth
      ).length;
      break;
    case "defeated":
      for (const unitType of unitTypes) {
        counts[unitType] = units.filter(
          ({ unitType: type, currentHealth }) =>
            type === unitType && currentHealth === 0
        ).length;
      }
      total = units.filter(({ currentHealth }) => currentHealth === 0).length;
      break;
  }
  if (countType === "injured" || countType === "defeated") {
    counts.total = total;
  }
  return counts;
}
