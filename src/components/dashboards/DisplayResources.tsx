import React from "react";
import { Resources } from "../../types";
import { Resource } from "../planning";

interface DisplayResourcesProps {
  resources: Resources;
  resourceTypes: string[];
}

export default function DisplayResources({
  resources,
  resourceTypes,
}: DisplayResourcesProps) {
  return (
    <div className="m-1">
      <div className="text-center font-bold sm:text-sm md:text-base lg:text-lg">
        Resources
      </div>
      <div className="grid auto-cols-max grid-flow-col justify-center gap-4 transition duration-75 ease-in-out md:text-lg lg:text-2xl">
        {resourceTypes.map((resourceType) => (
          /* @ts-ignore */
          <Resource resources={resources} resourceType={resourceType} />
        ))}
      </div>
    </div>
  );
}
