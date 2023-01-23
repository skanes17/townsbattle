import React from "react";
import { Resources } from "../../types";

interface ResourceProps {
  resources: Resources;
  resourceType: "wood" | "stone" | "metal";
}

export default function Resource({ resources, resourceType }: ResourceProps) {
  return (
    <div className="hover:text-yellow-300 ">
      {resources[resourceType].resourceSymbol}
      {resources[resourceType].collected}
    </div>
  );
}
