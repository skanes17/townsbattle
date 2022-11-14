export interface Unit {
  type: "melee" | "pewpew" | "tanky";
  name: "Melee" | "Pewpew" | "Tanky";
  attack: number;
  health: number;
  id?: number;
}
