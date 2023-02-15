export const resourceData = {
  workers: {
    name: "Freeworker",
    resourceSymbol: "🛠️",
    description:
      "Used when gathering resources, training units, and constructing buildings.",
  },
  wood: {
    name: "Wood",
    resourceSymbol: "🪵",
    workers: 0,
    workerName: "Wood",
    workerSymbol: "🪵",
    description: "Assign a worker to collect wood.",
  },
  stone: {
    name: "Stone",
    resourceSymbol: "🪨",
    workers: 0,
    workerName: "Stone",
    workerSymbol: "🪨",
    description: "Assign a worker to collect stone.",
  },
  metal: {
    name: "Metal",
    resourceSymbol: "🔩",
    workers: 0,
    workerName: "Metal",
    workerSymbol: "🔩",
    description: "Assign a worker to collect metal.",
  },
};

export const resourcePool = {
  workers: 5,
  wood: 0,
  stone: 0,
  metal: 0,
};

/*
// TODO: Consider a new approach:
export const resourceData = {
  collected: {
    workers: 5,
    wood: 0,
    stone: 0,
    metal: 0,
  },
  details: {
    workers: {
      name: "Freeworker",
      resourceSymbol: "🛠️",
      description:
        "Used when gathering resources, training units, and constructing buildings.",
    },
    wood: {
      name: "Wood",
      resourceSymbol: "🪵",
      workers: 0,
      workerName: "Woodcutters",
      workerSymbol: "🪓",
      description: "Collects 1🪵.",
    },
    stone: {
      name: "Stone",
      resourceSymbol: "🪨",
      workers: 0,
      workerName: "Stonemasons",
      workerSymbol: "⚒️",
      description: "Collects 1🪨.",
    },
    metal: {
      name: "Metal",
      resourceSymbol: "🔩",
      workers: 0,
      workerName: "Metalworkers",
      workerSymbol: "🥽",
      description: "Collects 1🔩.",
    },
  },
};
*/
