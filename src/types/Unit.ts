export type UnitType = "melee" | "pewpew" | "tanky";

export interface Unit {
  unitType: UnitType;
  name: "Melee" | "Pewpew" | "Tanky";
  nameSymbol: "⚔️" | "🏹" | "🛡️";
  description?: string;
  attack: number;
  health: number;
  id?: number;
}
