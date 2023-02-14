export const resourceData = {
  freeworkers: {
    collected: 5,
    name: "Freeworker",
    resourceSymbol: "🛠️",
    description:
      "Used when gathering resources, training units, and constructing buildings.",
  },
  wood: {
    collected: 0,
    name: "Wood",
    resourceSymbol: "🪵",
    workers: 0,
    workersNeeded: 1,
    workerName: "Woodcutters",
    workerType: "woodcutters",
    workerSymbol: "🪓",
    description: "Collects 1🪵.",
  },
  stone: {
    collected: 0,
    name: "Stone",
    resourceSymbol: "🪨",
    workers: 0,
    workersNeeded: 1,
    workerName: "Stonemasons",
    workerType: "stonemasons",
    workerSymbol: "⚒️",
    description: "Collects 1🪨.",
  },
  metal: {
    collected: 0,
    name: "Metal",
    resourceSymbol: "🔩",
    workers: 0,
    workersNeeded: 1,
    workerName: "Metalworkers",
    workerType: "metalworkers",
    workerSymbol: "🥽",
    description: "Collects 1🔩.",
  },
};

/*
// TODO: Consider a new approach:
export const resourceData = {
  collected: {
    freeworkers: 5,
    wood: 0,
    stone: 0,
    metal: 0,
  },
  details: {
    freeworkers: {
      name: "Freeworker",
      resourceSymbol: "🛠️",
      description:
        "Used when gathering resources, training units, and constructing buildings.",
    },
    wood: {
      name: "Wood",
      resourceSymbol: "🪵",
      workers: 0,
      workersNeeded: 1,
      workerName: "Woodcutters",
      workerType: "woodcutters",
      workerSymbol: "🪓",
      description: "Collects 1🪵.",
    },
    stone: {
      name: "Stone",
      resourceSymbol: "🪨",
      workers: 0,
      workersNeeded: 1,
      workerName: "Stonemasons",
      workerType: "stonemasons",
      workerSymbol: "⚒️",
      description: "Collects 1🪨.",
    },
    metal: {
      name: "Metal",
      resourceSymbol: "🔩",
      workers: 0,
      workersNeeded: 1,
      workerName: "Metalworkers",
      workerType: "metalworkers",
      workerSymbol: "🥽",
      description: "Collects 1🔩.",
    },
  },
};
*/
