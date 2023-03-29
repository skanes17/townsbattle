import { UnitType } from "../types";

export function smallChanceOfChoosingAVillager(
  normalUnitsNoVillagers: UnitType[],
  percentChanceOfChoosingVillager: number
) {
  // if the result of this calculation pops out 0, then it's essentially the likelihood of a villager being chosen
  const isVillager =
    Math.floor((Math.random() * 100) / percentChanceOfChoosingVillager) === 0;
  if (isVillager) {
    return "villager";
  } else {
    const randomNonVillagerUnitType =
      normalUnitsNoVillagers[
        Math.floor(Math.random() * normalUnitsNoVillagers.length)
      ];
    return randomNonVillagerUnitType;
  }
}
