export type UnitType = "melee" | "pewpew" | "tanky";
export type UnitName = "Melee" | "Pewpew" | "Tanky";

export interface Unit {
  unitType: UnitType;
  name: UnitName;
  nameSymbol: "⚔️" | "🏹" | "🛡️";
  description?: string;
  attack: number;
  maxHealth: number;
  currentHealth: number;
  canBeTrained: boolean;
  id?: number;
}

/* // TODO: Use Pick<> here? */
export interface TrainingUnit {
  unitType: UnitType;
  /* Can't remember where I was going to use tempId */
  tempId?: number;
}
