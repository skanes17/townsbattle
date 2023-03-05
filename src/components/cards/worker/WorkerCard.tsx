import React, { Dispatch, SetStateAction, useState } from "react";

import {
  Resources,
  ResourcePool,
  BaseResourceType,
  AddRemoveWorkerFn,
} from "../../../types";
import { cloneBasicObjectWithJSON } from "../../../utils";
import { AddRemoveButton } from "../../buttons";
import CardHeader from "../CardHeader";
import CardImageHeaderDescriptionContainer from "../CardImageHeaderDescriptionContainer";
import CardImageAndDescriptionContainer from "../CardImageHeaderDescriptionContainer";
import CardImage from "../CardImageHeaderDescriptionContainer";
import CardSymbol from "../CardSymbol";
import CardTemplate from "../CardTemplate";

import WorkerAssignCollect from "./WorkerAssignCollect";
import WorkerCardDescription from "./WorkerCardDescription";

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
      <CardTemplate color="resources">
        {/* <CardHeader
          bgColor="resources"
          cardName={resources[resourceType].name}
        /> */}
        <CardImageHeaderDescriptionContainer
          cardName={resources[resourceType].name}
          bgImage={resources[resourceType].bgImage}
          resources={resources}
          resourceType={resourceType}
        />

        {/* <WorkerCardDescription
          bgImage={resources[resourceType].bgImage}
          resources={resources}
          resourceType={resourceType}
        /> */}

        <WorkerAssignCollect
          resources={resources}
          resourceType={resourceType}
        />

        <div className="grid grid-cols-2 px-1">
          <div className="flex items-center justify-end pr-1">
            <AddRemoveButton
              buttonType="remove"
              onClick={() => removeWorker(resourceType)}
            >
              -
            </AddRemoveButton>
          </div>
          <div className="flex items-center justify-start pl-1">
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
