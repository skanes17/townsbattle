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
  const addRemoveWorkers: AddRemoveWorkerFn = (
    amount,
    resourceType,
    operation
  ) => {
    const selectedResource = resources[resourceType];
    if (!selectedResource) {
      alert("resource doesn't exist");
      return;
    }

    const clonedResourcePool = { ...resourcePool };
    const clonedResources = cloneBasicObjectWithJSON(resources);

    switch (operation) {
      case "add workers to resource":
        if (clonedResourcePool["workers"] > Math.max(amount - 1, 0)) {
          clonedResourcePool["workers"] -= amount;
          clonedResources[resourceType].workers += amount;
        }
        break;
      case "remove workers from resource":
        if (clonedResources[resourceType].workers > Math.max(amount - 1, 0)) {
          clonedResourcePool["workers"] += amount;
          clonedResources[resourceType].workers -= amount;
        }
        break;
      default:
        alert("invalid operation");
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

        <div className={`grid auto-rows-auto grid-cols-4 gap-1 px-1`}>
          <div className="col-span-2 row-start-1 flex items-center justify-center">
            <AddRemoveButton
              buttonType="remove"
              onClick={() =>
                addRemoveWorkers(
                  1,
                  resourceType,
                  "remove workers from resource"
                )
              }
            >
              -
            </AddRemoveButton>
          </div>

          <div className="col-span-2 row-start-1 flex items-center justify-center">
            <AddRemoveButton
              buttonType="add"
              onClick={() =>
                addRemoveWorkers(1, resourceType, "add workers to resource")
              }
            >
              +
            </AddRemoveButton>
          </div>
          <div className="col-start-1 row-start-2 flex items-center justify-center font-bold">
            <AddRemoveButton
              buttonType="remove"
              onClick={() =>
                addRemoveWorkers(
                  resources[resourceType].workers,
                  resourceType,
                  "remove workers from resource"
                )
              }
            >
              ZERO
            </AddRemoveButton>
          </div>
          <div className="col-start-2 row-start-2 flex items-center justify-center">
            <AddRemoveButton
              buttonType="remove"
              onClick={() =>
                addRemoveWorkers(
                  5,
                  resourceType,
                  "remove workers from resource"
                )
              }
            >
              -5
            </AddRemoveButton>
          </div>

          <div className="col-start-3 row-start-2 flex items-center justify-center font-bold">
            <AddRemoveButton
              buttonType="add"
              onClick={() =>
                addRemoveWorkers(5, resourceType, "add workers to resource")
              }
            >
              +5
            </AddRemoveButton>
          </div>

          <div className="col-start-4 row-start-2 flex items-center justify-center">
            <AddRemoveButton
              buttonType="add"
              onClick={() =>
                addRemoveWorkers(
                  resourcePool["workers"],
                  resourceType,
                  "add workers to resource"
                )
              }
            >
              MAX
            </AddRemoveButton>
          </div>
        </div>
      </CardTemplate>
    </>
  );
}
