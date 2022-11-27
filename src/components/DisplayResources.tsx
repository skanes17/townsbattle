import React from "react";
import { Resources } from "../types/Resources";

interface DisplayResourcesProps {
  resources: Resources;
}

export default function DisplayResources({ resources }: DisplayResourcesProps) {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>Resources</div>
      {/* TODO: <Resource /> three times -- DRY! */}
      <div>🛠️{resources.freeworkers} Freeworkers</div>
      <div>🪵{resources["wood"].collected} Wood </div>
      <div>🪨{resources["stone"].collected} Stone </div>
      <div>🔩{resources["metal"].collected} Metal </div>
    </>
  );
}
