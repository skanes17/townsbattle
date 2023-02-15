import { ResourceCosts, ResourcePool, ResourceType } from "../types";

export function resourceChecker(
  costsObject: ResourceCosts,
  resourcePool: ResourcePool
) {
  const resourceChecker = Object.keys(costsObject).map(
    (resourceType: string) =>
      resourcePool[resourceType as ResourceType] >=
      costsObject[resourceType as ResourceType]
  );
  // arr.every() will return true if every result of the map is true
  // otherwise false
  return resourceChecker.every(Boolean);
}
