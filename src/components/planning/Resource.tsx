import React from "react";
import { Resources, ResourceType } from "../../types";

interface ResourceProps {
  resources: Resources;
  resourceType: ResourceType;
}

export default function Resource({ resources, resourceType }: ResourceProps) {
  return (
    <div className="hover:text-yellow-300 ">
      {resources[resourceType].resourceSymbol}
      {resources[resourceType].collected}
    </div>
  );
}
