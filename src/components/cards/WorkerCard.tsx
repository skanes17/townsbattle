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
      <CardTemplate>
        <CardHeader cardName={resources[resourceType].workerName} />
        <CardSymbol cardSymbol={resources[resourceType].workerSymbol} />
        <CardDescription
          descriptionText={resources[resourceType].description}
        />

        <div className="flex justify-start pl-2 align-middle font-bold">
          Cost (can assign{" "}
          {resources["freeworkers"].collected /
            resources[resourceType].workersNeeded}{" "}
          more)
        </div>

        {/* Math.floor(resources["freeworkers"].collected / freeworkerCost) */}

        <div
          className={`flex justify-center align-middle text-lg ${costColor}`}
        >
          🛠️{/**/}
          {resources[resourceType].workersNeeded}
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
