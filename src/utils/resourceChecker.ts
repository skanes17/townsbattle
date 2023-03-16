import { ResourceCosts, ResourcePool, ResourceType } from "../types";

export function resourceChecker(
  amount: number,
  costsObject: ResourceCosts,
  resourcePool: ResourcePool
) {
  const resourceChecker = Object.keys(costsObject).map(
    (resourceType: string) =>
      resourcePool[resourceType as ResourceType] >=
      costsObject[resourceType as ResourceType] * amount
  );
  // arr.every() will return true if every result of the map is true
  // otherwise false
  return resourceChecker.every(Boolean);
}
