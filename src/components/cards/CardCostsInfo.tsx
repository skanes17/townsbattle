import React, { ReactNode } from "react";
import {
  BuildingCosts,
  BuildingType,
  Resources,
  ResourceType,
  UnitCosts,
  UnitType,
} from "../../types/";

interface CardCostsInfoProps {
  resources: Resources;
  costsObject: BuildingCosts | UnitCosts;
  /* is it a buildingType or unitType? */
  type: BuildingType | UnitType;
}

export default function CardCostsInfo({
  resources,
  costsObject,
  type,
}: CardCostsInfoProps) {
  const redText = "text-red-600";
  const greenText = "text-green-500";

  return (
    <div className="grid auto-rows-auto grid-cols-[min-content_1fr] pl-2">
      <div className="col-span-1 col-start-1 font-bold">Cost</div>
      <div className="col-span-1 col-start-2 ml-4 grid auto-rows-auto pr-2 text-right text-lg">
        {Object.keys(resources).map(
          (resourceType) =>
            /* If this resource is required, show its cost */
            costsObject[type][resourceType as ResourceType] > 0 && (
              <div>
                {resources[resourceType as ResourceType].resourceSymbol}
                <span
                  className={
                    /* if you have enough resources of that type, show green; otherwise red" */
                    resources[resourceType as ResourceType].collected <
                    costsObject[type][resourceType as ResourceType]
                      ? `${redText} px-1`
                      : `${greenText} px-1`
                  }
                >
                  {resources[resourceType as ResourceType].collected}
                </span>
                /
                <span className={`px-1`}>
                  {costsObject[type][resourceType as ResourceType]}
                </span>
              </div>
            )
        )}
      </div>
    </div>
  );
}
