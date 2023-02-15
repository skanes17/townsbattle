export interface Resources {
  workers: Pick<
    ResourceData,
    "collected" | "name" | "resourceSymbol" | "description"
  >;
  wood: ResourceData;
  stone: ResourceData;
  metal: ResourceData;
}

type BaseResources = Omit<Resources, "workers">;

interface ResourceData {
  collected: number;
  name: string;
  resourceSymbol: string;
  workers: number;
  workerName: string;
  workerSymbol: string;
  description: string;
}

export type ResourceType = keyof Resources; // Resource includes all the keys of Resources interface
export type BaseResourceType = keyof BaseResources; // this excludes "workers"

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
