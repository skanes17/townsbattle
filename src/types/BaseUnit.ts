import { Unit } from "./Unit";

type UnitNoCurrentHealth = Omit<Unit, "currentHealth">;

export interface BaseUnit {
  [key: string]: UnitNoCurrentHealth;
}
