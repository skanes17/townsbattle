import React from "react";
import { BaseResourceType, Resources } from "../../types";
import { WorkerCard } from "../cards";

interface WorkerCardContainerProps {
  resources: Resources;
  setResources: (resources: Resources) => void;
}

export default function WorkerCardContainer({
  resources,
  setResources,
}: WorkerCardContainerProps) {
  return (
    <>
      {/* This gets all the keys excluding "workers" */}
      {Object.keys(resources)
        .filter((key) => key !== "workers")
        .map((resourceType: string) => (
          <WorkerCard
            resources={resources}
            setResources={setResources}
            resourceType={resourceType as BaseResourceType}
          />
        ))}
    </>
  );
}
