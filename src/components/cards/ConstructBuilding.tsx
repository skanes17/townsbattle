import React, { Dispatch, SetStateAction } from "react";
import {
  /* BuildingCosts, */
  Buildings,
  BuildingType,
  Resources,
  ResourceType,
  /* ResourceType, */
} from "../../types/";
import { AddRemoveButton } from "../buttons";
import {
  CardCostsInfo,
  CardDescription,
  CardHeader,
  CardShowCount,
  CardSymbol,
  CardTemplate,
} from "../cards";

interface ConstructBuildingProps {
  buildings: Buildings;
  setBuildings: Dispatch<SetStateAction<Buildings>>;
  /* setBuildings: (buildings: Buildings) => void; */
  /* FIXME: Why is this being inferred as a number? */
  buildingType: BuildingType;
  resources: Resources;
  setResources: Dispatch<SetStateAction<Resources>>;
  /* setResources: (resources: Resources) => void; */
}

/* setMyUnits: (unit: Unit[]) => void; */

export default function ConstructBuilding({
  buildings,
  setBuildings,
  /* buildingCosts, */
  buildingType,
  resources,
  setResources,
}: ConstructBuildingProps) {
  // TODO: Toggle Build/Click alternate in UI
  const handleCancelClick = (buildingType: string) => {
    if (buildings[buildingType].underConstruction === true) {
      // cancel building construction
      const updatedBuildings = { ...buildings };
      updatedBuildings[buildingType].underConstruction = false;
      setBuildings(updatedBuildings);

      // give back resources
      const updatedResources = { ...resources };

      // null coalescing (??) used in case the resource asked for is undefined
      Object.keys(updatedResources).map((resourceType: string) => {
        updatedResources[resourceType as ResourceType].collected +=
          buildings[buildingType as BuildingType].resourceCosts[
            resourceType as ResourceType
          ] ?? 0;
      });

      setResources(updatedResources);
    }
  };

  const handleBuildClick = (buildingType: BuildingType) => {
    // check how many resources are collected compared to how many are required
    // || used to catch instances of undefined, setting falsy return to 0
    // eg. iteration of resourceType is "metal" but the object doesn't have metal
    const checkIfEnoughResources = Object.keys(resources).map(
      (resourceType: string) =>
        resources[resourceType as ResourceType].collected >=
          buildings[buildingType].resourceCosts[buildingType] || 0
    );

    if (
      buildings[buildingType].underConstruction === false &&
      checkIfEnoughResources.every(Boolean)
    ) {
      // set the building to be constructed
      const updatedBuildings = { ...buildings };
      updatedBuildings[buildingType].underConstruction = true;
      setBuildings(updatedBuildings);

      // reduce the resources according to costs
      const updatedResources = { ...resources };
      // null coalescing (??) used in case the resource asked for is undefined
      Object.keys(updatedResources).map((resourceType: string) => {
        updatedResources[resourceType as ResourceType].collected -=
          buildings[buildingType as BuildingType].resourceCosts[
            resourceType as ResourceType
          ] ?? 0;
      });

      setResources(updatedResources);
    } else {
      alert("Not enough resources!");
    }
  };

  const redText = "text-red-600";
  const greenText = "text-green-500";

  return (
    <CardTemplate color="blue">
      <CardHeader cardName={buildings[buildingType].name} />
      <CardSymbol cardSymbol={buildings[buildingType].nameSymbol} />
      <CardDescription descriptionText={buildings[buildingType].description} />

      <CardCostsInfo
        resources={resources}
        costsObject={buildings[buildingType].resourceCosts}
      />

      {/* TODO: Not enough resources? Make button inactive, add text "Not enough resources!" or similar */}
      <div className="flex items-center justify-around">
        <AddRemoveButton
          buttonType={
            buildings[buildingType].underConstruction ? "remove" : "add"
          }
          onClick={
            /* FIXME: Avoid using "as string" here if possible -- keyof BuildingType? */
            buildings[buildingType].underConstruction
              ? () => handleCancelClick(buildingType as string)
              : () => handleBuildClick(buildingType as string)
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
