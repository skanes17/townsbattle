import { ResourceCosts } from "./ResourceCosts";

export interface Building {
  name: string;
  nameSymbol: string;
  imageSrc?: string;
  /* enabled: boolean; */
  underConstruction: boolean;
  constructed: boolean;
  tier: number;
  attackBonus: number;
  healthBonus: number;
  armorBonus?: number;
  description?: string;
  bonus?: string;
  health: number;
  resourceCosts: ResourceCosts;
}

export interface Buildings {
  [index: string]: Building;
}

export type BuildingType = keyof Buildings;
