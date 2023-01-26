import React from "react";
import { BaseResource, Resources } from "../../types";
import { WorkerCard } from "../cards";

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
        /* FIXME: TS is yelling */
        /* @ts-ignore */
        .map((resourceType: BaseResource) => (
          <WorkerCard
            resources={resources}
            setResources={setResources}
            resourceType={resourceType}
          />
        ))}
    </>
  );
}
