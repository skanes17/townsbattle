import React from "react";
import { ResourcePool, Resources, ResourceType } from "../../types";

interface ResourceProps {
  resources: Resources;
  resourcePool: ResourcePool;
  resourceType: ResourceType;
}

export default function Resource({
  resources,
  resourcePool,
  resourceType,
}: ResourceProps) {
  return (
    <div className="hover:text-yellow-300 ">
      {resources[resourceType].symbol}
      {resourcePool[resourceType]}
    </div>
  );
}

/* 
let bg = resources[resourceType].bgImageSm ?? ``;

  return (
    <div className="group flex flex-row align-middle md:h-8 lg:h-9">
      <div
        className={`rounded-lg border border-zinc-700 group-hover:border-yellow-300 md:h-8 md:w-8 lg:h-9 lg:w-9 ${bg} bg-cover bg-center`}
      ></div>
      <div className="text-right group-hover:text-yellow-300">
        {resources[resourceType].symbol}
        {resourcePool[resourceType]}
      </div>
    </div>
  );
*/
