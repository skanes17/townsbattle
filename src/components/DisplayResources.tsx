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
      <div>🪵Wood {resources["wood"].collected}</div>
      <div>🪨Stone {resources["stone"].collected}</div>
      <div>🔩Metal {resources["metal"].collected}</div>
    </>
  );
}
