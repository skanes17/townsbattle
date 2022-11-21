import React from "react";
import { Resources } from "../types/Resources";

interface DisplayResourcesProps {
  resources: Resources;
}

// @ts-ignore
export default function DisplayResources({ resources }: DisplayResourcesProps) {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>Resources collected</div>
      {/* TODO: <Resource /> three times -- DRY! */}
      {/* NOTE: If using the resource object is wonky, go back to old code for now */}
      <div>🪵Wood {resources.woodCollected}</div>
      <div>🪨Stone {resources.stoneCollected}</div>
      <div>🔩Metal {resources.metalCollected}</div>
    </>
  );
}
