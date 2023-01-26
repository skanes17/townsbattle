import React from "react";
import { AddResourceFn, ResourceType } from "../../types";

export interface AddResourceButtonProps {
  addResource: AddResourceFn;
  resourceType: ResourceType;
  name: string;
  className: string;
}

export default function AddResourceButton({
  addResource,
  resourceType,
  name,
  className,
}: AddResourceButtonProps) {
  return (
    <>
      <button onClick={() => addResource(resourceType)} className={className}>
        +10 {name} (DevTool)
      </button>
    </>
  );
}
