import React from "react";
import { BuildingCosts } from "../../types/BuildingCosts";
import { Buildings } from "../../types/Buildings";
import { Resources } from "../../types/Resources";
import AddRemoveButton from "../buttons/AddRemoveButton";
import CardDescription from "./CardDescription";
import CardHeader from "./CardHeader";
import CardShowCount from "./CardShowCount";
import CardSymbol from "./CardSymbol";
import CardTemplate from "./CardTemplate";
import HorizLine3ColGrid from "./HorizLine3ColGrid";

interface ConstructBuildingProps {
  buildings: Buildings;
  setBuildings: any;
  buildingCosts: BuildingCosts;
  buildingType: string;
  resources: Resources;
  setResources: any;
}

export default function ConstructBuilding({
  buildings,
  setBuildings,
  buildingCosts,
  buildingType,
  resources,
  setResources,
}: ConstructBuildingProps) {
  const freeworkerCost = buildings[buildingType]["freeworkerCost"];
  const woodCost = buildings[buildingType]["woodCost"];
  const stoneCost = buildings[buildingType]["stoneCost"];
  const metalCost = buildings[buildingType]["metalCost"];

  // TODO: Toggle Build/Click alternate in UI
  const handleCancelClick = (buildingType: string) => {
    if (buildings[buildingType].underConstruction === true) {
      // cancel building construction
      const updatedBuildings = { ...buildings };
      updatedBuildings[buildingType].underConstruction = false;
      setBuildings(updatedBuildings);

      // give back resources
      const updatedResources = { ...resources };
      updatedResources["freeworkers"].collected += freeworkerCost;
      updatedResources["wood"].collected += woodCost;
      updatedResources["stone"].collected += stoneCost;
      updatedResources["metal"].collected += metalCost;
      setResources(updatedResources);
    }
  };

  const handleBuildClick = (buildingType: string) => {
    if (
      buildings[buildingType].underConstruction === false &&
      resources["freeworkers"].collected >= freeworkerCost &&
      resources["wood"].collected >= woodCost &&
      resources["stone"].collected >= stoneCost &&
      resources["metal"].collected >= metalCost
    ) {
      // set the building to be constructed
      const updatedBuildings = { ...buildings };
      updatedBuildings[buildingType].underConstruction = true;
      setBuildings(updatedBuildings);

      // reduce the resources according to costs
      const updatedResources = { ...resources };
      updatedResources["freeworkers"].collected -= freeworkerCost;
      updatedResources["wood"].collected -= woodCost;
      updatedResources["stone"].collected -= stoneCost;
      updatedResources["metal"].collected -= metalCost;
      setResources(updatedResources);
    } else {
      alert("Not enough resources!");
    }
  };

  const redCost = "text-red-600";
  const greenCost = "text-green-500";

  return (
    <CardTemplate>
      <CardHeader cardName={buildings[buildingType].name} />
      <CardSymbol cardSymbol={buildings[buildingType].nameSymbol} />
      <CardDescription descriptionText={buildings[buildingType].description} />
      <div className="col-span-3 flex justify-start pl-2 align-middle font-bold">
        Cost
      </div>
      {/* TODO: Improve the uses of ternary operator below */}
      <div className="col-span-3 flex justify-center align-middle text-lg">
        {/* TODO: Refactor to improve nested ternary */}
        {Object.keys(resources).map(
          (resourceType) =>
            /* If this resource is required, show its cost */
            /* @ts-ignore */
            buildingCosts[buildingType][resourceType] > 0 &&
            // if you don't have enough collected to train the unit, show in red; else green
            /* @ts-ignore */
            (resources[resourceType].collected <
            /* @ts-ignore */
            buildingCosts[buildingType][resourceType] ? (
              <span className={`${redCost}`}>
                {/* @ts-ignore */}
                {resources[resourceType].resourceSymbol}
                {/* @ts-ignore */}
                {buildingCosts[buildingType][resourceType]}{" "}
              </span>
            ) : (
              <span className={`${greenCost}`}>
                {/* @ts-ignore */}
                {resources[resourceType].resourceSymbol}
                {/* @ts-ignore */}
                {buildingCosts[buildingType][resourceType]}{" "}
              </span>
            ))
        )}
      </div>

      <div className="col-span-3 flex items-center justify-around">
        <AddRemoveButton
          buttonType={
            buildings[buildingType].underConstruction ? "remove" : "add"
          }
          onClick={
            buildings[buildingType].underConstruction
              ? () => handleCancelClick(buildingType)
              : () => handleBuildClick(buildingType)
          }
        >
          {buildings[buildingType].underConstruction
            ? "Cancel Construction"
            : "Build"}
        </AddRemoveButton>
      </div>
    </CardTemplate>
  );
}
