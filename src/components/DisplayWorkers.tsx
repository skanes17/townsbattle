import React from "react";
import { Resources } from "../types/Resources";
import Worker from "./Worker";

interface DisplayWorkersProps {
  resources: Resources;
  setResources: any;
}

export default function DisplayWorkers({
  resources,
  setResources,
}: DisplayWorkersProps) {
  return (
    <div className="workers">
      <div style={{ fontWeight: "bold" }}>Workers</div>

      {/* This gets all the keys excluding "freeworkers" */}
      {Object.keys(resources)
        .filter((key) => key != "freeworkers")
        .map((resourceType: string) => (
          <Worker
            /* name={resources[resourceType].name}
            workerType={resources[resourceType].workerType} */
            resources={resources}
            setResources={setResources}
            resourceType={resourceType}
          />
        ))}

      {/* <Worker
        name="🪓 Woodcutters"
        workerType="woodcutters"
        resources={resources}
        setResources={setResources}
      />
      <Worker
        name="⚒️ Stonemasons"
        workerType="stonemasons"
        resources={resources}
        setResources={setResources}
      />
      <Worker
        name="🥽 Metalworkers"
        workerType="metalworkers"
        resources={resources}
        setResources={setResources}
      /> */}
    </div>
  );
}
