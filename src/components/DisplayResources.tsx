import React from "react";
import { Resources } from "../types/Resources";
import Resource from "./Resource";

interface DisplayResourcesProps {
  resources: Resources;
  resourceTypes: string[];
}

export default function DisplayResources({
  resources,
  resourceTypes,
}: DisplayResourcesProps) {
  return (
    <div>
      <div className="font-bold text-lg">Resources</div>
      <div className="grid grid-flow-col gap-4 auto-cols-max">
        <div>🛠️{resources.freeworkers}</div>
        {resourceTypes.map((resourceType) => (
          /* @ts-ignore */
          <Resource resources={resources} resourceType={resourceType} />
        ))}
      </div>
    </div>
  );
}
