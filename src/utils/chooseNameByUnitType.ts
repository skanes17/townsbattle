import {
  archerNames,
  bombirdNames,
  fighterNames,
  knightNames,
  mageNames,
  randomUnitNames,
  villagerNames,
} from "../gameData";
import { UnitType } from "../types";

export function chooseNameByUnitType(unitType: UnitType) {
  let randomName;
  switch (unitType) {
    case "villager":
      randomName =
        villagerNames[Math.floor(Math.random() * villagerNames.length)];
      break;
    case "fighter":
      randomName =
        fighterNames[Math.floor(Math.random() * fighterNames.length)];
      break;
    case "archer":
      randomName = archerNames[Math.floor(Math.random() * archerNames.length)];
      break;
    case "knight":
      randomName = knightNames[Math.floor(Math.random() * knightNames.length)];
      break;
    case "mage":
      randomName = mageNames[Math.floor(Math.random() * mageNames.length)];
      break;
    case "bombird":
      randomName =
        bombirdNames[Math.floor(Math.random() * bombirdNames.length)];
      break;
  }
  return randomName;
}
