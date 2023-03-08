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
  let bg = resources[resourceType].bgImageSm;

  return (
    <div className="group flex h-8 flex-row align-middle hover:text-yellow-300">
      <div
        className={`mr-2 h-8 w-8 rounded-lg border border-zinc-700 group-hover:border-yellow-300 ${bg} bg-cover bg-center`}
      ></div>
      <div className="text-right group-hover:text-yellow-300">
        {resources[resourceType].workers * resources[resourceType].multiplier}
      </div>
    </div>
  );
}
