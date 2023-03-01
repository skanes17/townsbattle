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
  return (
    <div className="hover:text-yellow-300 ">
      {resources[resourceType].symbol}
      {resourcePool[resourceType]}
    </div>
  );
}
