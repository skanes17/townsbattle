export interface Resources {
  freeworkers: number;
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

// TODO: How to define shape of an object like this?

/*
resources = {
  freeworkers: 5,
  wood: {
    collected: 0,
    workers: 0
  },
  stone: {
    collected: 0,
    workers: 0
  },
  metal: {
    collected: 0,
    workers: 0
  }
};
*/
