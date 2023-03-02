export const resourceData = {
  workers: {
    name: "worker",
    symbol: "🛠️",
  },
  wood: {
    name: "wood",
    symbol: "🪵",
    workers: 0,
    multiplier: 1,
  },
  stone: {
    name: "stone",
    symbol: "🪨",
    workers: 0,
    multiplier: 1,
  },
  metal: {
    name: "metal",
    symbol: "🔩",
    workers: 0,
    multiplier: 1,
  },
  crystal: {
    name: "crystal",
    symbol: "💎",
    workers: 0,
    multiplier: 1,
  },
  gold: {
    name: "gold",
    symbol: "🪙",
    workers: 0,
    multiplier: 1,
  },
};

export const resourcePoolData = {
  workers: 5,
  wood: 0,
  stone: 0,
  metal: 0,
  crystal: 0,
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
