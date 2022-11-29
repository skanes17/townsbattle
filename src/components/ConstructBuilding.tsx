import React from "react";
import { Buildings } from "../types/Buildings";
import { Resources } from "../types/Resources";
import AddRemoveButton from "./AddRemoveButton";
import CardName from "./CardName";
import CardShowCount from "./CardShowCount";
import CardSymbol from "./CardSymbol";
import CardTemplate from "./CardTemplate";
import HorizLine3ColGrid from "./HorizLine3ColGrid";

interface ConstructBuildingProps {
  buildings: Buildings;
  setBuildings: any;
  buildingType: string;
  resources: Resources;
  setResources: any;
}

export default function ConstructBuilding({
  buildings,
  setBuildings,
  buildingType,
  resources,
  setResources,
}: ConstructBuildingProps) {
  const freeworkerCost = buildings[buildingType].freeworkerCost;
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
      updatedResources.freeworkers += freeworkerCost;
      updatedResources["wood"].collected += woodCost;
      updatedResources["stone"].collected += stoneCost;
      updatedResources["metal"].collected += metalCost;
      setResources(updatedResources);
    }
  };

  const handleBuildClick = (buildingType: string) => {
    if (
      buildings[buildingType].underConstruction === false &&
      resources.freeworkers >= freeworkerCost &&
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
      updatedResources.freeworkers -= freeworkerCost;
      updatedResources["wood"].collected -= woodCost;
      updatedResources["stone"].collected -= stoneCost;
      updatedResources["metal"].collected -= metalCost;
      setResources(updatedResources);
    } else {
      alert("Not enough resources!");
    }
  };

  return (
    <CardTemplate>
      <CardName cardName={buildings[buildingType].name} />
      <CardSymbol cardSymbol={buildings[buildingType].nameSymbol} />
      <HorizLine3ColGrid />
      <div className="pl-2 font-bold flex justify-start align-middle col-span-3">
        Cost
      </div>
      {/* TODO: Improve the uses of ternary operator below */}
      <div className="flex justify-center align-middle col-span-3">
        {freeworkerCost > 0 ? `🛠️${freeworkerCost} ` : ""}
        {woodCost > 0 ? `🪵${woodCost} ` : ""}
        {stoneCost > 0 ? `🪨${stoneCost} ` : ""}
        {metalCost > 0 ? `🔩${metalCost} ` : ""}
      </div>

      <div className="flex justify-around items-center col-span-3">
        <AddRemoveButton
          buttonType="minus"
          onClick={
            buildings[buildingType].underConstruction
              ? () => handleCancelClick(buildingType)
              : () => handleBuildClick(buildingType)
          }
        >
          {buildings[buildingType].underConstruction ? "Cancel" : "Build"}
        </AddRemoveButton>

        <CardShowCount
          countToShow={buildings[buildingType].underConstruction ? "Yes" : "No"}
        />
      </div>
    </CardTemplate>
  );
}
