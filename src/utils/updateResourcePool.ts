import { ResourceCosts, ResourcePool, ResourceType } from "../types";

export function updateResources(
  // note: thingsToMake determines how many things to create/destroy
  // for example if creating one thing, use thingsToMake = 1
  // if destroying one thing, use thingsToMake = -1
  // if making 15 things, use thingsToMake = 15
  thingsToMake: number,
  costsObject: ResourceCosts,
  resourcePool: ResourcePool
) {
  // instead of using Object.keys() we're using Object.entries()
  // this is used because the key and value are both required
  // resourceType holds the current key for costsObject, like "workers", "wood", etc
  // "cost" gives the values for the current resourceType key

  // null coalescing (??) used in case the resource asked for is undefined
  Object.entries(costsObject).forEach(([resourceType, cost]) => {
    resourcePool[resourceType as ResourceType] +=
      -1 * (cost ?? 0) * thingsToMake ?? 0;
  });
}
