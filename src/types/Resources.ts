export interface Resources {
  workers: Pick<ResourceData, "name" | "symbol">;
  wood: ResourceData;
  stone: ResourceData;
  metal: ResourceData;
  gold: ResourceData;
}

type BaseResources = Omit<Resources, "workers">;

interface ResourceData {
  name: string;
  symbol: string;
  workers: number;
  multiplier: number;
}

export type ResourceType = keyof Resources; // Resource includes all the keys of Resources interface
export type BaseResourceType = keyof BaseResources; // this excludes "workers"

export type ResourcePool = {
  [key in ResourceType]: number;
};

export type ResourceMultipliers = {
  [key in BaseResourceType]: number;
};
