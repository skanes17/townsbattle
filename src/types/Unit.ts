import { ResourceCosts } from "./ResourceCosts";

export type UnitType =
  | "villager"
  | "fighter"
  | "archer"
  | "knight"
  | "mage"
  | "bombird";
export type UnitName =
  | "Villager"
  | "Fighter"
  | "Archer"
  | "Knight"
  | "Mage"
  | "Bombird";

export interface Unit {
  unitType: UnitType;
  name: UnitName;
  randomName: string;
  symbol: "🧑🏻‍🌾" | "⚔️" | "🏹" | "🛡️" | "🪄" | "💣";
  description?: string;
  lockedText: string;
  bgImage: string;
  bgImageSm: string;
  bgImageMd: string;
  bgImageLg: string;
  threatLevel: number;
  attack: number;
  maxHealth: number;
  // reduce incoming damage
  armor: number;
  currentHealth: number;
  resourceCosts: ResourceCosts;
  buildScore: number;
  hitsFirst: boolean;
  fullHealthBonus: boolean;
  fullHealthAttackBonus?: number;
  chargesBeforeSelection: boolean;
  // multiply this by times not selected to get added damage
  chargingMultiplier?: number;
  berserker: boolean;
  berserkerAttackMultiplier?: number;
  id?: number;
  combatsSurvived?: number;
  survivalArmorBonus: boolean;
}

export interface BaseUnitData {
  [key: string]: BaseUnit;
}

export type BaseUnit = Omit<Unit, "currentHealth" | "randomName">;

/* // TODO: Use Pick<> here? */
export interface TrainingUnit {
  unitType: UnitType;
  /* Can't remember where I was going to use tempId */
  tempId?: number;
}
