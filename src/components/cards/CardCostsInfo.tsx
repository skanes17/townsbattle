import React, { ReactNode } from "react";
import {
  BuildingType,
  ResourceCosts,
  ResourcePool,
  Resources,
  ResourceType,
  UnitType,
} from "../../types/";

interface CardCostsInfoProps {
  lockedOrUnlockedUnits?: "locked" | "unlocked";
  resources: Resources;
  resourcePool: ResourcePool;
  costsObject: ResourceCosts;
}

export default function CardCostsInfo({
  lockedOrUnlockedUnits,
  resources,
  resourcePool,
  costsObject,
}: CardCostsInfoProps) {
  const redText = "text-red-600";
  const greenText = "text-green-500";

  const blurLockedUnitInfo =
    lockedOrUnlockedUnits === "locked" ? `blur-[2px]` : ``;

  return (
    <div
      className={`${blurLockedUnitInfo} grid auto-rows-auto grid-cols-[min-content_1fr] self-start px-2`}
    >
      <div className="col-start-1 text-xs font-bold sm:text-lg">Cost</div>
      <div className="col-start-2 grid auto-rows-auto text-right text-sm sm:text-lg">
        {Object.keys(resources).map(
          (resourceType: string) =>
            /* If this resource is required, show its cost */
            /* If the resource is undefined, set the result to 0 */
            (costsObject[resourceType as ResourceType] ?? 0) > 0 && (
              <div>
                {resources[resourceType as ResourceType].symbol}
                <span
                  className={
                    /* if you have enough resources of that type, show green; otherwise red" */
                    resourcePool[resourceType as ResourceType] >=
                    (costsObject[resourceType as ResourceType] ?? 0)
                      ? `${greenText} px-1`
                      : `${redText} px-1`
                  }
                >
                  {resourcePool[resourceType as ResourceType]}
                </span>
                /
                <span className={`px-1`}>
                  {costsObject[resourceType as ResourceType]}
                </span>
              </div>
            )
        )}
      </div>
    </div>
  );
}
