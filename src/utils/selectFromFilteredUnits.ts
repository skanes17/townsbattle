import { UnitType } from "../types";

export function selectFromFilteredUnits(
  allUnitTypes: UnitType[],
  numberOfDesiredUnits: number
) {
  const desiredUnitTypes = allUnitTypes.slice(0, numberOfDesiredUnits);
  const randomlyChosenUnitType =
    desiredUnitTypes[Math.floor(Math.random() * desiredUnitTypes.length)]!;
  return randomlyChosenUnitType;
}
