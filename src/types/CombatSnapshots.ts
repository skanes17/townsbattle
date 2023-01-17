// old system - replaced by Combat Events
export interface UnitSnapshot {
  name: string;
  id?: number;
  friendly: boolean;
}

export interface Action {
  effect: "damaged" | "healed";
  value: number;
}

export interface CombatSnapshot {
  friendly: UnitSnapshot;
  enemy: UnitSnapshot;
  friendlyAction: Action;
  enemyAction: Action;
}
