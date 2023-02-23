import { ResourceCosts } from "./ResourceCosts";

export type UnitType = "melee" | "pewpew" | "tanky";
export type UnitName = "Melee" | "Pewpew" | "Tanky";

export interface Unit {
  unitType: UnitType;
  /* FIXME: UnitName not being properly enforced when imported */
  name: UnitName;
  symbol: "⚔️" | "🏹" | "🛡️";
  description?: string;
  attack: number;
  maxHealth: number;
  currentHealth: number;
  resourceCosts: ResourceCosts;
  buildScore: number;
  hitsFirst: boolean;
  fullHealthAttackBonus: number;
  // reduce incoming damage
  armor: number;
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
