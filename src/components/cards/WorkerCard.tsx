import React, { useState } from "react";
import { Resources } from "../../types/Resources";
import CardHeader from "./CardHeader";
import CardShowCount from "./CardShowCount";
import CardSymbol from "./CardSymbol";
import CardTemplate from "./CardTemplate";
import AddRemoveButton from "../buttons/AddRemoveButton";
import CardDescription from "./CardDescription";

/* TODO: Consider if it would be cleaner to ditch workers and harvest a resource per click.
Could have a limit on clicks (energy bar, actions available, etc), each click uses energy.
Basically the same result since workers are reset each turn. */

interface WorkerCardProps {
  /* name: string;
  workerType: string; */
  resources: Resources;
  setResources: any;
  resourceType: string;
}

// @ts-ignore
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
      // @ts-ignore
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
          Cost
        </div>

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
