import React from "react";
import { Resources } from "../types/Resources";
import WorkerCard from "./WorkerCard";

interface AssignWorkersProps {
  resources: Resources;
  setResources: any;
}

export default function AssignWorkers({
  resources,
  setResources,
}: AssignWorkersProps) {
  return (
    <>
      {/* This gets all the keys excluding "freeworkers" */}
      {Object.keys(resources)
        .filter((key) => key != "freeworkers")
        .map((resourceType: string) => (
          <WorkerCard
            resources={resources}
            setResources={setResources}
            resourceType={resourceType}
          />
        ))}
    </>
  );
}
