import { Unit } from "./Unit";

export interface BaseUnit {
  [key: string]: Omit<Unit, "currentHealth">;
}
