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

    if (resources["freeworkers"].collected > 0) {
      const updatedResources = { ...resources };

      updatedResources["freeworkers"].collected -= 1;
      updatedResources[resourceType].workers += 1;

      setResources(updatedResources);
    } else {
      alert("No free workers!");
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
      updatedResources["freeworkers"].collected += 1;
      updatedResources[resourceType].workers -= 1;
      setResources(updatedResources);
    }
  };

  let costColor;
  resources["freeworkers"].collected < resources[resourceType].workersNeeded
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

        <div className="grid auto-rows-auto grid-cols-2">
          <div className="justify-self-start pl-2 font-bold">Cost</div>
          <div className={`justify-self-start pr-2 text-lg`}>
            🛠️
            <span className={`${costColor} px-1`}>
              {resources["freeworkers"].collected}
            </span>
            /
            <span className={`px-1`}>
              {resources[resourceType].workersNeeded}
            </span>
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
