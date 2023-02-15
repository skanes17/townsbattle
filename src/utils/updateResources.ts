import { ResourceCosts, Resources, ResourceType } from "../types";

export function updateResources(
  costsObject: ResourceCosts,
  resourcesObject: Resources,
  // note: thingsToMake determines how many things to create/destroy
  // for example if creating one thing, use thingsToMake = 1
  // if destroying one thing, use thingsToMake = -1
  // if making 15 things, use thingsToMake = 15
  thingsToMake: number
) {
  // instead of using Object.keys() we're using Object.entries()
  // this is used because the key and value are both required
  // resourceType holds the current key for costsObject, like "workers", "wood", etc
  // "cost" gives the values for the current resourceType key

  // null coalescing (??) used in case the resource asked for is undefined
  Object.entries(costsObject).forEach(([resourceType, cost]) => {
    resourcesObject[resourceType as ResourceType].collected +=
      (cost ?? 0) * -1 * thingsToMake ?? 0;
  });
}
