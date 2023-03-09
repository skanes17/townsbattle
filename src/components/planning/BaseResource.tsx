import React from "react";
import { BaseResourceType, ResourcePool, Resources } from "../../types";

interface BaseResourceProps {
  resources: Resources;
  resourcePool: ResourcePool;
  resourceType: BaseResourceType;
}

export default function BaseResource({
  resources,
  resourcePool,
  resourceType,
}: BaseResourceProps) {
  let bg = resources[resourceType].bgImageSm;

  return (
    <div className="group flex flex-row align-middle md:h-8 lg:h-9">
      <div
        className={`rounded-lg border border-zinc-700 group-hover:border-yellow-300 md:h-8 md:w-8 lg:h-9 lg:w-9 ${bg} bg-cover bg-center`}
      ></div>
      <div className="text-right group-hover:text-yellow-300">
        {resourcePool[resourceType]}
      </div>
    </div>
  );
}
