import { ResourceCosts } from "./ResourceCosts";
import { BaseResourceType } from "./Resources";
import { UnitType } from "./Unit";

export interface Building {
  name: string;
  symbol: string;
  imageSrc?: string;
  enabled: boolean;
  underConstruction: boolean;
  constructed: boolean;
  tier: number;
  /* attackBonus: number;
  healthBonus: number; */
  description: string;
  bgImage?: string;
  maxHealth: number;
  currentHealth: number;
  damage: number;
  resourceCosts: ResourceCosts;
  buildScore: number;
  unlockedUnit?: UnitType;
  unlockedResource?: BaseResourceType;
  workerBonus?: number;
}

export interface Buildings {
  [index: string]: Building;
}

export type BuildingType = keyof Buildings;
