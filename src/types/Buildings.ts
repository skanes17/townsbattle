import { ResourceCosts } from "./ResourceCosts";

export interface Building {
  name: string;
  nameSymbol: string;
  imageSrc?: string;
  underConstruction: boolean;
  constructed: boolean;
  tier: number;
  attackBonus: number;
  healthBonus: number;
  description: string;
  bgImage?: string;
  health: number;
  resourceCosts: ResourceCosts;
}

export interface Buildings {
  [index: string]: Building;
}

export type BuildingType = keyof Buildings;
