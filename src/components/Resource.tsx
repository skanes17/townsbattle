import React from "react";
import { Resources } from "../types/Resources";

interface ResourceProps {
  resources: Resources;
  resourceType: "wood" | "stone" | "metal";
}

export default function Resource({ resources, resourceType }: ResourceProps) {
  return (
    <div>
      {resources[resourceType].resourceSymbol}
      {resources[resourceType].collected}
    </div>
  );
}
