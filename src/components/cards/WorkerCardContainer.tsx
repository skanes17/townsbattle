import React, { Dispatch, SetStateAction } from "react";
import {
  BaseResourceType,
  ResourceMultipliers,
  ResourcePool,
  Resources,
} from "../../types";
import { WorkerCard } from "../cards";

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
