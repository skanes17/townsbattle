import React from "react";
import { Resources } from "../types/Resources";

interface DisplayResourcesProps {
  resources: Resources;
}

export default function DisplayResources({ resources }: DisplayResourcesProps) {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>Resources collected</div>
      {/* TODO: <Resource /> three times -- DRY! */}
      <div>🪵Wood {resources.woodCollected}</div>
      <div>🪨Stone {resources.stoneCollected}</div>
      <div>🔩Metal {resources.metalCollected}</div>
    </>
  );
}
