import UnitCount from "../components/UnitCount";

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

/* // TODO: Use Pick<> here? */
export interface TrainingUnit {
  unitType: UnitType;
  tempId: number;
}
