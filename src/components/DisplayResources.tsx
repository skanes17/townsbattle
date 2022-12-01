import React from "react";
import { Resources } from "../types/Resources";
import HeaderStatsBlock from "./HeaderStatsBlock";
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
    <div className="m-1">
      <div className="font-bold sm:text-sm md:text-base lg:text-lg">
        Resources
      </div>
      <div className="grid auto-cols-max grid-flow-col gap-4 transition duration-75 ease-in-out hover:scale-105 hover:text-yellow-300 md:text-lg lg:text-2xl">
        <div>🛠️{resources.freeworkers}</div>
        {resourceTypes.map((resourceType) => (
          /* @ts-ignore */
          <Resource resources={resources} resourceType={resourceType} />
        ))}
      </div>
    </div>
  );
}
