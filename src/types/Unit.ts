import { ResourceCosts } from "./ResourceCosts";

export type UnitType = "farmer" | "melee" | "pewpew" | "tanky" | "mage";
export type UnitName = "Farmer" | "Melee" | "Pewpew" | "Tanky" | "Mage";

export interface Unit {
  unitType: UnitType;
  /* FIXME: UnitName not being properly enforced when imported */
  name: UnitName;
  symbol: "🧑🏻‍🌾" | "⚔️" | "🏹" | "🛡️" | "🪄";
  description?: string;
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
  timesSelectedForCombat: number;
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
