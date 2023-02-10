import React from "react";
import { BaseResourceType, Resources } from "../../types";

interface ResourceToCollectProps {
  resources: Resources;
  resourceType: BaseResourceType;
}

export default function ResourceToCollect({
  resources,
  resourceType,
}: ResourceToCollectProps) {
  return (
    <div className="hover:text-yellow-300 ">
      {resources[resourceType].resourceSymbol} {resources[resourceType].workers}
    </div>
  );
}
