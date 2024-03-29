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
  // right now it's just a scale of relative good-ness; eventually replace with bonuses, or add new bldgs
  tier: number;
  attackBonus: number;
  healthBonus: number;
  description: string;
  bgImage: string;
  bgImageSm: string;
  bgImageMd: string;
  bgImageLg: string;
  maxHealth: number;
  currentHealth: number;
  damage: number;
  resourceCosts: ResourceCosts;
  // (workers + resources) * 10
  buildScore: number;
  unlockedUnit?: UnitType;
  unlockedResource?: BaseResourceType;
  workerBonus?: number;
}

export interface Buildings {
  [index: string]: Building;
}

export type BuildingType = keyof Buildings;
