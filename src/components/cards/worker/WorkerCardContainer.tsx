import React, { Dispatch, SetStateAction } from "react";
import { WorkerCard } from ".";
import { Resources, ResourcePool, BaseResourceType } from "../../../types";

interface WorkerCardContainerProps {
  resources: Resources;
  setResources: Dispatch<SetStateAction<Resources>>;
  resourcePool: ResourcePool;
  setResourcePool: Dispatch<SetStateAction<ResourcePool>>;
}

export default function WorkerCardContainer({
  resources,
  setResources,
  resourcePool,
  setResourcePool,
}: WorkerCardContainerProps) {
  return (
    <>
      {/* This gets all the keys excluding "workers" */}
      {Object.keys(resources)
        .filter((key) => key !== "workers")
        .map((resourceType: string) => (
          <WorkerCard
            resources={resources}
            setResources={setResources}
            resourcePool={resourcePool}
            setResourcePool={setResourcePool}
            resourceType={resourceType as BaseResourceType}
          />
        ))}
    </>
  );
}
