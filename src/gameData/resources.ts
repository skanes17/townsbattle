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
    multiplier: 1,
    description: `Collect 1 wood per turn per worker.`,
  },
  stone: {
    name: "Stone",
    symbol: "🪨",
    workers: 0,
    multiplier: 1,
    description: "Collect 1 per turn per worker.",
  },
  metal: {
    name: "Metal",
    symbol: "🔩",
    workers: 0,
    multiplier: 1,
    description: "Collect 1 per turn per worker.",
  },
  gold: {
    name: "Gold",
    symbol: "🪙",
    workers: 0,
    multiplier: 1,
    description: "Collect 1 gold per turn per worker.",
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
