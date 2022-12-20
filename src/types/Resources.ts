// TODO: Incorporate something like "pick" for freeworkers here?
// TODO: Improve this type? Make it more dyanmic, less prescriptive?
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

/* FIXME: Incorporate the following but fix the associated error in <Game/> */
/* 
// TODO: Continue to improve this type, make it more dynamic, less prescriptive

export interface Resources {
  freeworkers: Freeworker;
  wood: Resource;
  stone: Resource;
  metal: Resource;
}
interface Resource {
  collected: number;
  name: string;
  resourceSymbol: ResourceSymbol;
  workers: number;
  workerName: string;
  workerType: string;
  workerSymbol: WorkerSymbol;
  description: string;
}

type Freeworker = Pick<
  Resource,
  "collected" | "name" | "resourceSymbol" | "description"
>;

type ResourceSymbol = "🪵" | "🪨" | "🔩";
type WorkerSymbol = "🪓" | "⚒️" | "🥽";
 */
