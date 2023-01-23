import React, { useState } from "react";
import { Resources } from "../../types";
import {
  CardHeader,
  CardShowCount,
  CardSymbol,
  CardTemplate,
  CardDescription,
} from "../cards";
import { AddRemoveButton } from "../buttons";

interface WorkerCardProps {
  /* name: string;
  workerType: string; */
  resources: Resources;
  setResources: any;
  resourceType: string;
}

export default function WorkerCard({
  /* name,
  workerType, */
  resources,
  setResources,
  resourceType,
}: WorkerCardProps) {
  const handlePlusClick = (resourceType: string) => {
    //@ts-ignore
    const selectedResource = resources[resourceType];
    if (!selectedResource) {
      alert("resource doesn't exist");
      return;
    }

    if (resources["freeworkers"].collected > 0) {
      const updatedResources = { ...resources };

      updatedResources["freeworkers"].collected -= 1;
      //@ts-ignore
      updatedResources[resourceType].workers += 1;

      setResources(updatedResources);
    } else {
      alert("No free workers!");
    }
  };

  const handleMinusClick = (resourceType: string) => {
    //@ts-ignore
    const selectedResource = resources[resourceType];
    if (!selectedResource) {
      alert("resource doesn't exist");
      return;
    }

    //@ts-ignore
    if (resources[resourceType].workers > 0) {
      const updatedResources = { ...resources };
      updatedResources["freeworkers"].collected += 1;
      // @ts-ignore
      updatedResources[resourceType].workers -= 1;
      setResources(updatedResources);
    }
  };

  let costColor;
  /* @ts-ignore */
  resources["freeworkers"].collected < resources[resourceType].workersNeeded
    ? (costColor = "text-red-600")
    : (costColor = "text-green-500");

  return (
    <>
      <CardTemplate>
        <CardHeader
          /* @ts-ignore */
          cardName={resources[resourceType].workerName}
        />
        {/* @ts-ignore */}
        <CardSymbol cardSymbol={resources[resourceType].workerSymbol} />
        <CardDescription
          /* @ts-ignore */
          descriptionText={resources[resourceType].description}
        />

        <div className="col-span-3 flex justify-start pl-2 align-middle font-bold">
          Cost (can assign{" "}
          {resources["freeworkers"].collected /
            /* @ts-ignore */
            resources[resourceType].workersNeeded}{" "}
          more)
        </div>

        {/* Math.floor(resources["freeworkers"].collected / freeworkerCost) */}

        <div
          className={`col-span-3 flex justify-center align-middle text-lg ${costColor}`}
        >
          🛠️{/**/}
          {/* @ts-ignore */}
          {resources[resourceType].workersNeeded}
        </div>

        <div className="flex items-center justify-end">
          <AddRemoveButton
            buttonType="remove"
            onClick={() => handleMinusClick(resourceType)}
          >
            -
          </AddRemoveButton>
        </div>

        {/* @ts-ignore */}
        <CardShowCount countToShow={resources[resourceType].workers} />

        <div className="flex items-center justify-start">
          <AddRemoveButton
            buttonType="add"
            onClick={() => handlePlusClick(resourceType)}
          >
            +
          </AddRemoveButton>
        </div>
      </CardTemplate>
    </>
  );
}
