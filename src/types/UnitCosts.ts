export interface UnitCost {
  wood: number;
  stone: number;
  metal: number;
  freeworkers: number;
}

export interface UnitCosts {
  [index: string]: UnitCost;
}
