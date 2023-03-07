import React from "react";
import { ResourcePool, Resources, ResourceType } from "../../types";
import { Resource } from "../planning";

interface DisplayResourcesProps {
  resources: Resources;
  resourcePool: ResourcePool;
  resourceTypes: string[];
}

export default function DisplayResources({
  resources,
  resourcePool,
  resourceTypes,
}: DisplayResourcesProps) {
  return (
    <div className="m-1">
      <div className="text-center font-bold sm:text-sm md:text-base lg:text-lg">
        Resources
      </div>
      <div className="grid auto-cols-max grid-flow-col justify-center gap-1 transition duration-75 ease-in-out md:gap-4 md:text-lg lg:text-2xl">
        {resourceTypes.map((resourceType: string) => (
          <Resource
            resources={resources}
            resourcePool={resourcePool}
            resourceType={resourceType as ResourceType}
          />
        ))}
      </div>
    </div>
  );
}
