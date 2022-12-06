// TODO: Incorporate something like "pick" for freeworkers here?

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
