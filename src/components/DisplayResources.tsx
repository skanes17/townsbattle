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
    <div className="m-auto text-center">
      <div className="font-bold lg:text-lg md:text-base sm:text-sm">
        Resources
      </div>
      <div className="transition ease-in-out hover:scale-105 hover:text-yellow-300 grid lg:text-2xl md:text-lg grid-flow-col gap-4 auto-cols-max">
        <div>🛠️{resources.freeworkers}</div>
        {resourceTypes.map((resourceType) => (
          /* @ts-ignore */
          <Resource resources={resources} resourceType={resourceType} />
        ))}
      </div>
    </div>
  );
}
