import React, { Dispatch, SetStateAction, useState } from "react";
import { WorkerCardDescription } from ".";

import {
  Resources,
  ResourcePool,
  BaseResourceType,
  AddRemoveWorkerFn,
} from "../../../types";
import { cloneBasicObjectWithJSON } from "../../../utils";
import { AddRemoveButton } from "../../buttons";
import CardHeader from "../CardHeader";
import CardSymbol from "../CardSymbol";
import CardTemplate from "../CardTemplate";

import WorkerAssignCollect from "./WorkerAssignCollect";

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

  return (
    <>
      <CardTemplate color="amber">
        <CardHeader cardName={resources[resourceType].name} />
        {/* <CardSymbol cardSymbol={resources[resourceType].symbol} /> */}
        {/* <CardDescription
          descriptionText={resources[resourceType].description}
        /> */}

        <WorkerCardDescription
          bgImage={resources[resourceType].bgImage}
          resources={resources}
          resourceType={resourceType}
        />

        <WorkerAssignCollect
          resources={resources}
          resourceType={resourceType}
        />

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
