import React from "react";
import { Resources } from "../types/Resources";

interface DisplayResourcesProps {
  resources: Resources;
}

export default function DisplayResources({ resources }: DisplayResourcesProps) {
  return (
    <div>
      <div className="font-bold">Resources</div>
      <div className="grid grid-flow-col gap-4 auto-cols-max">
        {/* TODO: <Resource /> three times -- DRY! */}
        <div>🛠️{resources.freeworkers}</div>
        <div>🪵{resources["wood"].collected} </div>
        <div>🪨{resources["stone"].collected} </div>
        <div>🔩{resources["metal"].collected} </div>
      </div>
    </div>
  );
}
