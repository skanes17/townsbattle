export interface Resources {
  workers: Pick<ResourceData, "name" | "symbol" | "description">;
  wood: ResourceData;
  stone: ResourceData;
  metal: ResourceData;
}

type BaseResources = Omit<Resources, "workers">;

interface ResourceData {
  name: string;
  symbol: string;
  workers: number;
  description: string;
}

export type ResourceType = keyof Resources; // Resource includes all the keys of Resources interface
export type BaseResourceType = keyof BaseResources; // this excludes "workers"

export type ResourcePool = {
  [key in ResourceType]: number;
};

/* FIXME: Incorporate the following refactoring but fix the associated error in <Game/> */
// TODO: Continue to improve this type, make it more dynamic, less prescriptive

/* type ResourceName = "Freeworker" | "Wood" | "Stone" | "Metal";
type ResourceSymbol = "🛠️" | "🪵" | "🪨" | "🔩";
type WorkerName = "Woodcutters" | "Stonemasons" | "Metalworkers";
type WorkerSymbol = "🪓" | "⚒️" | "🥽";

interface Resource {
  collected: number;
  name: "Freeworker" | "Wood" | "Stone" | "Metal";
  resourceSymbol: "🛠️" | "🪵" | "🪨" | "🔩";
  workers: number;
  workerName: "Woodcutters" | "Stonemasons" | "Metalworkers";
  workerSymbol: "🪓" | "⚒️" | "🥽";
  description: string;
}

type Freeworker = Pick<
  Resource,
  "collected" | "name" | "resourceSymbol" | "description"
>;

export interface Resources {
  workers: Freeworker;
  wood: Resource;
  stone: Resource;
  metal: Resource;
} */
