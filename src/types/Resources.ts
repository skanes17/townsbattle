export interface Resources {
  freeworkers: number;
  wood: {
    collected: number;
    workers: number;
    workerName: string;
    workerType: string;
  };
  stone: {
    collected: number;
    workers: number;
    workerName: string;
    workerType: string;
  };
  metal: {
    collected: number;
    workers: number;
    workerName: string;
    workerType: string;
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
