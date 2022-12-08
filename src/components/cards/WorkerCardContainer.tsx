import React from "react";
import { Resources } from "../../types/Resources";
import WorkerCard from "./WorkerCard";

interface WorkerCardContainerProps {
  resources: Resources;
  setResources: any;
}

export default function WorkerCardContainer({
  resources,
  setResources,
}: WorkerCardContainerProps) {
  return (
    <>
      {/* This gets all the keys excluding "freeworkers" */}
      {Object.keys(resources)
        .filter((key) => key !== "freeworkers")
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
