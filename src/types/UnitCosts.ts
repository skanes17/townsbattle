export interface UnitCost {
  wood: number;
  stone: number;
  metal: number;
  freeworker: number;
}

export interface UnitCosts {
  [index: string]: UnitCost;
}
