import React, { Dispatch, SetStateAction } from "react";
import { WorkerCard } from ".";
import { Resources, ResourcePool, BaseResourceType } from "../../../types";

interface WorkerCardContainerProps {
  resources: Resources;
  setResources: Dispatch<SetStateAction<Resources>>;
  resourceTypesAvailableToPlayer: (BaseResourceType | undefined)[];
  resourcePool: ResourcePool;
  setResourcePool: Dispatch<SetStateAction<ResourcePool>>;
}

export default function WorkerCardContainer({
  resources,
  setResources,
  resourceTypesAvailableToPlayer,
  resourcePool,
  setResourcePool,
}: WorkerCardContainerProps) {
  return (
    <>
      {resourceTypesAvailableToPlayer.map(
        (resourceType: BaseResourceType | undefined) => (
          <WorkerCard
            resources={resources}
            setResources={setResources}
            resourcePool={resourcePool}
            setResourcePool={setResourcePool}
            resourceType={resourceType as BaseResourceType}
          />
        )
      )}
    </>
  );
}
