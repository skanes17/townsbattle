export interface Resources {
  freeworkers: Pick<
    ResourceData,
    "collected" | "name" | "resourceSymbol" | "description"
  >;
  wood: ResourceData;
  stone: ResourceData;
  metal: ResourceData;
}

type BaseResources = Omit<Resources, "freeworkers">;

interface ResourceData {
  collected: number;
  name: string;
  resourceSymbol: string;
  workers: number;
  workersNeeded: number;
  workerName: string;
  workerType: string;
  workerSymbol: string;
  description: string;
}

export type Resource = keyof Resources; // Resource includes all the keys of Resources interface
export type BaseResource = keyof BaseResources; // this excludes "freeworkers"

/* FIXME: Incorporate the following refactoring but fix the associated error in <Game/> */
// TODO: Continue to improve this type, make it more dynamic, less prescriptive

/* type ResourceName = "Freeworker" | "Wood" | "Stone" | "Metal";
type ResourceSymbol = "🛠️" | "🪵" | "🪨" | "🔩";
type WorkerName = "Woodcutters" | "Stonemasons" | "Metalworkers";
type WorkerType = "woodcutters" | "stonemasons" | "metalworkers";
type WorkerSymbol = "🪓" | "⚒️" | "🥽";

interface Resource {
  collected: number;
  name: "Freeworker" | "Wood" | "Stone" | "Metal";
  resourceSymbol: "🛠️" | "🪵" | "🪨" | "🔩";
  workers: number;
  workerName: "Woodcutters" | "Stonemasons" | "Metalworkers";
  workerType: "woodcutters" | "stonemasons" | "metalworkers";
  workerSymbol: "🪓" | "⚒️" | "🥽";
  description: string;
}

type Freeworker = Pick<
  Resource,
  "collected" | "name" | "resourceSymbol" | "description"
>;

export interface Resources {
  freeworkers: Freeworker;
  wood: Resource;
  stone: Resource;
  metal: Resource;
} */
