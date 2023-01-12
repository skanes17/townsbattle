export interface UnitSnapshot {
  name: string;
  friendly: boolean;
}

export interface Action {
  effect: "damaged" | "healed";
  value: number;
}

export interface CombatSnapshot {
  source: UnitSnapshot;
  target: UnitSnapshot;
  action: Action;
}
