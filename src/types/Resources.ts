export interface Resources {
  freeworkers: {
    collected: number;
    name: string;
    resourceSymbol: string;
    description: string;
  };
  wood: {
    collected: number;
    name: string;
    resourceSymbol: string;
    workers: number;
    workerName: string;
    workerType: string;
    workerSymbol: string;
    description: string;
  };
  stone: {
    collected: number;
    name: string;
    resourceSymbol: string;
    workers: number;
    workerName: string;
    workerType: string;
    workerSymbol: string;
    description: string;
  };
  metal: {
    collected: number;
    name: string;
    resourceSymbol: string;
    workers: number;
    workerName: string;
    workerType: string;
    workerSymbol: string;
    description: string;
  };
}

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
