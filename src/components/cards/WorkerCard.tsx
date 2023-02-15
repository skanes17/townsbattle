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

  let costColor;
  resourcePool["workers"] < 1
    ? (costColor = "text-red-600")
    : (costColor = "text-green-500");

  return (
    <>
      <CardTemplate color="amber">
        <CardHeader cardName={resources[resourceType].workerName} />
        <CardSymbol cardSymbol={resources[resourceType].workerSymbol} />
        <CardDescription
          descriptionText={resources[resourceType].description}
        />

        <div className="grid auto-rows-auto grid-cols-[min-content_1fr] pl-2">
          <div className="col-span-1 col-start-1 font-bold">Cost</div>
          <div className="col-span-1 col-start-2 ml-4 grid auto-rows-auto pr-2 text-right text-lg">
            <div>
              🛠️
              <span className={`${costColor} px-1`}>
                {resourcePool["workers"]}
              </span>
              /<span className={`px-1`}>1</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3">
          <div className="flex items-center justify-end">
            <AddRemoveButton
              buttonType="remove"
              onClick={() => removeWorker(resourceType)}
            >
              -
            </AddRemoveButton>
          </div>
          <CardShowCount countToShow={resources[resourceType].workers} />
          <div className="flex items-center justify-start">
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
