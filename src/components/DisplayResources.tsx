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
      <div>🪵{resources["wood"].collected} </div>
      <div>🪨{resources["stone"].collected} </div>
      <div>🔩{resources["metal"].collected} </div>
    </>
  );
}
