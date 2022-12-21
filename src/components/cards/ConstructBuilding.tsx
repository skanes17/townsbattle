import React from "react";
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
        {freeworkerCost > 0 ? `🛠️${freeworkerCost} ` : ""}
        {woodCost > 0 ? `🪵${woodCost} ` : ""}
        {stoneCost > 0 ? `🪨${stoneCost} ` : ""}
        {metalCost > 0 ? `🔩${metalCost} ` : ""}
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
