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
      {resources[resourceType].resourceSymbol}
      {resourcePool[resourceType]}
    </div>
  );
}
