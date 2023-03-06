import { ResourceCosts } from "./ResourceCosts";

export type UnitType =
  | "farmer"
  | "fighter"
  | "archer"
  | "knight"
  | "mage"
  | "bombird";
export type UnitName =
  | "Farmer"
  | "Fighter"
  | "Archer"
  | "Knight"
  | "Mage"
  | "Bombird";

export interface Unit {
  unitType: UnitType;
  /* FIXME: UnitName not being properly enforced when imported */
  name: UnitName;
  symbol: "🧑🏻‍🌾" | "⚔️" | "🏹" | "🛡️" | "🪄" | "💣";
  description?: string;
  bgImage: string;
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

/* // TODO: Use Pick<> here? */
export interface TrainingUnit {
  unitType: UnitType;
  /* Can't remember where I was going to use tempId */
  tempId?: number;
}
