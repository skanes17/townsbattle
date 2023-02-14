import { ResourceCosts, Resources, ResourceType } from "../types";

export function resourceChecker(
  costsObject: ResourceCosts,
  resourcesObject: Resources
) {
  const resourceChecker = Object.keys(costsObject).map(
    (resourceType: string) =>
      resourcesObject[resourceType as ResourceType].collected >=
      costsObject[resourceType as ResourceType]
  );
  // arr.every() will return true if every result of the map is true
  // otherwise false
  return resourceChecker.every(Boolean);
}
