import React from "react";

export interface AddResourceButtonProps {
  addResource: any;
  resourceType: string;
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
        +1 {name} (DevTool)
      </button>
    </>
  );
}
