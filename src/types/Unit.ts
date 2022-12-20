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
  id?: number;
}

/* // TODO: Use Pick<> here? */
export interface TrainingUnit {
  unitType: UnitType;
  tempId: number;
}
