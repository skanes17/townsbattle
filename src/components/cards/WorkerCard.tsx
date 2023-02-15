import React, { useState } from "react";
import { BaseResourceType, Resources, ResourceType } from "../../types";
import {
  CardHeader,
  CardShowCount,
  CardSymbol,
  CardTemplate,
  CardDescription,
} from "../cards";
import { AddRemoveButton } from "../buttons";
import { AddRemoveWorkerFn } from "../../types/FunctionTypes";

interface WorkerCardProps {
  resources: Resources;
  setResources: (resources: Resources) => void;
  resourceType: BaseResourceType;
}

export default function WorkerCard({
  resources,
  setResources,
  resourceType,
}: WorkerCardProps) {
  const addWorker: AddRemoveWorkerFn = (resourceType) => {
    const selectedResource = resources[resourceType];
    if (!selectedResource) {
      alert("resource doesn't exist");
      return;
    }

    if (resources["workers"].collected > 0) {
      const updatedResources = { ...resources };

      updatedResources["workers"].collected -= 1;
      updatedResources[resourceType].workers += 1;

      setResources(updatedResources);
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
      const updatedResources = { ...resources };
      updatedResources["workers"].collected += 1;
      updatedResources[resourceType].workers -= 1;
      setResources(updatedResources);
    }
  };

  let costColor;
  resources["workers"].collected < resources[resourceType].workersNeeded
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
                {resources["workers"].collected}
              </span>
              /
              <span className={`px-1`}>
                {resources[resourceType].workersNeeded}
              </span>
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
