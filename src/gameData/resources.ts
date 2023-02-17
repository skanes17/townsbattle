export const resourceData = {
  workers: {
    name: "Worker",
    symbol: "🛠️",
    description:
      "Used when gathering resources, training units, and constructing buildings.",
  },
  wood: {
    name: "Wood",
    symbol: "🪵",
    workers: 0,
    description: "Collect wood. Costs 1 worker.",
  },
  stone: {
    name: "Stone",
    symbol: "🪨",
    workers: 0,
    description: "Collect stone. Costs 1 worker.",
  },
  metal: {
    name: "Metal",
    symbol: "🔩",
    workers: 0,
    description: "Collect metal. Costs 1 worker.",
  },
  gold: {
    name: "Gold",
    symbol: "🪙",
    workers: 0,
    description: "Collect gold, +10 score per gold. Costs 1 worker.",
  },
};

export const resourcePoolData = {
  workers: 5,
  wood: 0,
  stone: 0,
  metal: 0,
  gold: 0,
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
