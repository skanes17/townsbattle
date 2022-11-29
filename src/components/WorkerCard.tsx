import React, { useState } from "react";
import { Resources } from "../types/Resources";
import CardName from "./CardName";
import CardShowCount from "./CardShowCount";
import CardSymbol from "./CardSymbol";
import CardTemplate from "./CardTemplate";
import HorizLine3ColGrid from "./HorizLine3ColGrid";
import PlusMinusButton from "./AddRemoveButton";

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

    if (resources.freeworkers > 0) {
      const updatedResources = { ...resources };
      // @ts-ignore
      updatedResources.freeworkers = updatedResources.freeworkers - 1;
      //@ts-ignore
      updatedResources[resourceType].workers =
        //@ts-ignore
        updatedResources[resourceType].workers + 1;

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
      updatedResources.freeworkers = updatedResources.freeworkers + 1;
      // @ts-ignore
      updatedResources[resourceType].workers =
        //@ts-ignore
        updatedResources[resourceType].workers - 1;
      setResources(updatedResources);
    }
  };

  // TODO: break this into its own component so I just send "woodcutters" once
  return (
    <>
      <CardTemplate>
        <CardName
          /* @ts-ignore */
          cardName={resources[resourceType].workerName}
        />
        {/* @ts-ignore */}
        <CardSymbol cardSymbol={resources[resourceType].workerSymbol} />
        <HorizLine3ColGrid />

        <div className="pl-2 font-bold flex justify-start align-middle col-span-3">
          Cost
        </div>

        <div className="flex justify-center align-middle col-span-3">
          🛠️{/**/}1
        </div>

        <div className="flex justify-end items-center">
          <PlusMinusButton
            buttonType="plus"
            onClick={() => handleMinusClick(resourceType)}
          >
            -1
          </PlusMinusButton>
        </div>

        {/* @ts-ignore */}
        <CardShowCount countToShow={resources[resourceType].workers} />

        <div className="flex justify-start items-center">
          <PlusMinusButton
            buttonType="minus"
            onClick={() => handlePlusClick(resourceType)}
          >
            +1
          </PlusMinusButton>
        </div>
      </CardTemplate>
    </>
  );
}
