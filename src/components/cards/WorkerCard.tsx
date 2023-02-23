import React, { Dispatch, SetStateAction, useState } from "react";
import {
  BaseResourceType,
  ResourcePool,
  Resources,
  ResourceType,
} from "../../types";
import {
  CardHeader,
  CardShowCount,
  CardSymbol,
  CardTemplate,
  CardDescription,
  CardCostsInfo,
} from "../cards";
import { AddRemoveButton } from "../buttons";
import { AddRemoveWorkerFn } from "../../types/FunctionTypes";
import { cloneBasicObjectWithJSON } from "../../utils";

interface WorkerCardProps {
  resources: Resources;
  setResources: Dispatch<SetStateAction<Resources>>;
  resourcePool: ResourcePool;
  setResourcePool: Dispatch<SetStateAction<ResourcePool>>;
  resourceType: BaseResourceType;
}

export default function WorkerCard({
  resources,
  setResources,
  resourcePool,
  setResourcePool,
  resourceType,
}: WorkerCardProps) {
  const addWorker: AddRemoveWorkerFn = (resourceType) => {
    const selectedResource = resources[resourceType];
    if (!selectedResource) {
      alert("resource doesn't exist");
      return;
    }

    if (resourcePool["workers"] > 0) {
      const clonedResourcePool = { ...resourcePool };
      const clonedResources = cloneBasicObjectWithJSON(resources);

      clonedResourcePool["workers"] -= 1;
      clonedResources[resourceType].workers += 1;

      setResourcePool(clonedResourcePool);
      setResources(clonedResources);
    } else {
      alert("You have no workers left!");
    }
  };

  const removeWorker: AddRemoveWorkerFn = (resourceType) => {
    const selectedResource = resources[resourceType];
    if (!selectedResource) {
      alert("resource doesn't exist");
      return;
    }

    if (resources[resourceType].workers > 0) {
      const clonedResourcePool = { ...resourcePool };
      const clonedResources = cloneBasicObjectWithJSON(resources);

      clonedResourcePool["workers"] += 1;
      clonedResources[resourceType].workers -= 1;

      setResourcePool(clonedResourcePool);
      setResources(clonedResources);
    }
  };

  /* let costColor;
  resourcePool["workers"] < 1
    ? (costColor = "text-red-600")
    : (costColor = "text-green-500"); */

  let countStyle;
  if (resources[resourceType].workers > 0) {
    countStyle = "font-bold text-amber-400";
  }

  return (
    <>
      <CardTemplate color="amber">
        <CardHeader cardName={resources[resourceType].name} />
        <CardSymbol cardSymbol={resources[resourceType].symbol} />
        <CardDescription
          descriptionText={resources[resourceType].description}
        />

        <div className="grid grid-cols-2 pl-2">
          <div className="font-bold">Assigned</div>
          <div className="self-center justify-self-center">
            {resources["workers"].symbol}{" "}
            <span className={`${countStyle}`}>
              {resources[resourceType].workers}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 pl-2">
          <div className="font-bold">To Collect</div>
          <div className="self-center justify-self-center">
            {resources[resourceType].symbol}{" "}
            <span className={`${countStyle}`}>
              {resources[resourceType].workers *
                resources[resourceType].multiplier}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="flex items-center justify-end px-1">
            <AddRemoveButton
              buttonType="remove"
              onClick={() => removeWorker(resourceType)}
            >
              -
            </AddRemoveButton>
          </div>
          <div className="flex items-center justify-start px-1">
            <AddRemoveButton
              buttonType="add"
              onClick={() => addWorker(resourceType)}
            >
              +
            </AddRemoveButton>
          </div>
        </div>
      </CardTemplate>
    </>
  );
}
