export interface Resources2 {
  [name: string]: number;
}

// collected resources
const pooledResources: Resources2 = {
  worker: 0,
  wood: 0,
  stone: 0,
  iron: 0,
};

const building = {
  id: "",
  art: "",
  resources: {
    wood: 2,
  },
};

interface Unit {
  id: string;
  resources: Resources2;
}

const unitToBeTrained: Unit = {
  id: "silly",
  resources: {
    worker: 1,
    stone: 1,
    wood: 1,
  },
};

// [worker, stone, wood]
// @ts-ignore
const maxTrainable = Math.min(
  /* @ts-ignore */
  Object.keys(unitToBeTrained.resources).map(
    (resource) =>
      pooledResources[resource] ?? 0 / unitToBeTrained.resources[resource]
  )
);

// will output just what you need -- [1, 3, 4]
// each map output will give a number -- 1

// keys can be strings or numbers
const foo = {
  name: "bob",
  "0": "edude",
};
