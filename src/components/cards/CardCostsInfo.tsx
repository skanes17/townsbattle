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
  resources: Resources;
  resourcePool: ResourcePool;
  costsObject: ResourceCosts;
}

export default function CardCostsInfo({
  resources,
  resourcePool,
  costsObject,
}: CardCostsInfoProps) {
  const redText = "text-red-600";
  const greenText = "text-green-500";

  /* FIXME: ts-ignores below!! Refactor with null coalescing untested as of Feb 13 2023 */

  return (
    <div className="grid auto-rows-auto grid-cols-[min-content_1fr] pl-2">
      <div className="col-span-1 col-start-1 font-bold">Cost</div>
      <div className="col-span-1 col-start-2 ml-4 grid auto-rows-auto pr-2 text-right text-lg">
        {Object.keys(resources).map(
          (resourceType: string) =>
            /* If this resource is required, show its cost */
            /* If the resource is undefined, set the result to 0 */
            /* @ts-ignore */
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
                  {/* @ts-ignore */}
                  {costsObject[resourceType as ResourceType]}
                </span>
              </div>
            )
        )}
      </div>
    </div>
  );
}
