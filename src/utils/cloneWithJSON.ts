import { BaseUnitData, Buildings, ResourcePool, Resources } from "../types";
import { NavButtons } from "../types/NavButtons";
import { TipsSeen } from "../types/TutorialTypes";

// used extends here to increase type safety
// in this case, it ensures that the argument matches Resources or Buildings types
// Careful! This JSON deep cloning process won't work for functions or other methods
export function cloneBasicObjectWithJSON<
  T extends
    | Resources
    | ResourcePool
    | Buildings
    | NavButtons
    | TipsSeen
    | BaseUnitData
>(objectToClone: T): T {
  const clonedData: T = JSON.parse(JSON.stringify(objectToClone));
  return clonedData;
}
