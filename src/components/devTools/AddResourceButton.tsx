import React from "react";
import { AddResourceFn, Resource } from "../../types";

export interface AddResourceButtonProps {
  addResource: AddResourceFn;
  resourceType: Resource;
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
