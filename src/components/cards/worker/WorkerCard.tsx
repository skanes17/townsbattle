import React, { Dispatch, SetStateAction, useState } from "react";

import {
  Resources,
  ResourcePool,
  BaseResourceType,
  AddRemoveWorkerFn,
} from "../../../types";
import { cloneBasicObjectWithJSON } from "../../../utils";
import { AddRemoveButton } from "../../buttons";
import CardImageHeaderDescriptionContainer from "../CardImageHeaderDescriptionContainer";
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
  // TODO: Extract functions out of this, consolidate with trainUnit code
  const addRemoveWorker: AddRemoveWorkerFn = (amount, resourceType) => {
    const selectedResource = resources[resourceType];
    if (!selectedResource) {
      alert("resource doesn't exist");
      return;
    }

    const clonedResourcePool = { ...resourcePool };
    const clonedResources = cloneBasicObjectWithJSON(resources);

    if (resourcePool["workers"] >= amount) {
      clonedResourcePool["workers"] -= amount;
      clonedResources[resourceType].workers += amount;
    } else if (resources[resourceType].workers >= amount) {
      clonedResourcePool["workers"] += amount;
      clonedResources[resourceType].workers -= amount;
    } else {
      return;
    }

    setResourcePool(clonedResourcePool);
    setResources(clonedResources);
  };

  return (
    <>
      <CardTemplate color="resources">
        <CardImageHeaderDescriptionContainer
          saturation="oversaturated"
          cardName={resources[resourceType].name}
          bgImage={resources[resourceType].bgImage}
        >
          Gather {resources[resourceType].multiplier}{" "}
          {resources[resourceType].name} for every worker.
        </CardImageHeaderDescriptionContainer>

        <WorkerAssignCollect
          resources={resources}
          resourceType={resourceType}
        />

        <div
          className={`grid auto-cols-min grid-cols-2 gap-1 px-1 sm:grid-cols-4`}
        >
          <div className="col-start-1 row-start-1 flex items-center justify-center sm:col-start-2">
            <AddRemoveButton
              buttonType="remove"
              onClick={() => addRemoveWorker(-1, resourceType)}
            >
              -1
            </AddRemoveButton>
          </div>
          <div className="col-start-2 row-start-1 flex items-center justify-center sm:col-start-3">
            <AddRemoveButton
              buttonType="add"
              onClick={() => addRemoveWorker(1, resourceType)}
            >
              +1
            </AddRemoveButton>
          </div>
          <div className="col-start-1 row-start-2 flex items-center justify-center font-bold sm:col-start-1 sm:row-start-1">
            <AddRemoveButton
              buttonType="minus 5"
              onClick={() => addRemoveWorker(-5, resourceType)}
            >
              -5
            </AddRemoveButton>
          </div>
          <div className="col-start-2 row-start-2 flex items-center justify-center sm:col-start-4 sm:row-start-1">
            <AddRemoveButton
              buttonType="plus 5"
              onClick={() => addRemoveWorker(5, resourceType)}
            >
              +5
            </AddRemoveButton>
          </div>
        </div>
      </CardTemplate>
    </>
  );
}
