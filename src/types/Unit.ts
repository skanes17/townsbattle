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
  fullHealthAttackBonus: number;
  chargesBeforeSelection: boolean;
  // multiply this by times not selected to get added damage
  chargingMultiplier: number;
  id?: number;
}

export interface BaseUnit {
  [key: string]: Omit<Unit, "currentHealth">;
}

export interface TrainingUnit {
  unitType: UnitType;
}
