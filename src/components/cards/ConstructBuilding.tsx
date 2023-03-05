import React, { Dispatch, SetStateAction } from "react";
import {
  Buildings,
  BuildingType,
  ResourcePool,
  Resources,
  ResourceType,
} from "../../types/";
import {
  cloneBasicObjectWithJSON,
  updateResources as updateResourcePool,
} from "../../utils";
import { resourceChecker } from "../../utils/resourceChecker";
import { AddRemoveButton } from "../buttons";
import {
  CardCostsInfo,
  CardDescription,
  CardHeader,
  CardShowCount,
  CardSymbol,
  CardTemplate,
} from "../cards";
import CardImageHeaderDescriptionContainer from "./CardImageHeaderDescriptionContainer";

interface ConstructBuildingProps {
  buildings: Buildings;
  setBuildings: Dispatch<SetStateAction<Buildings>>;
  /* setBuildings: (buildings: Buildings) => void; */
  /* FIXME: Why is this being inferred as a number? */
  buildingType: BuildingType;
  resources: Resources;
  setResources: Dispatch<SetStateAction<Resources>>;
  resourcePool: ResourcePool;
  setResourcePool: Dispatch<SetStateAction<ResourcePool>>;
  /* setResources: (resources: Resources) => void; */
}

export default function ConstructBuilding({
  buildings,
  setBuildings,
  buildingType,
  resources,
  setResources,
  resourcePool,
  setResourcePool,
}: ConstructBuildingProps) {
  // get the resource costs for the given building type
  const costsObject = buildings[buildingType].resourceCosts;

  const handleCancelClick = (buildingType: string) => {
    if (buildings[buildingType].underConstruction === true) {
      // cancel building construction
      const clonedBuildingsData = cloneBasicObjectWithJSON(buildings);
      clonedBuildingsData[buildingType as BuildingType].underConstruction =
        false;
      setBuildings(clonedBuildingsData);

      // give back resources
      const clonedResourcePool = cloneBasicObjectWithJSON(resourcePool);
      updateResourcePool(costsObject, clonedResourcePool, -1);

      setResourcePool(clonedResourcePool);
    }
  };

  const handleBuildClick = (buildingType: string) => {
    // check that you've collected all required resources
    const resourceCheck = resourceChecker(costsObject, resourcePool);

    if (buildings[buildingType].underConstruction === false && resourceCheck) {
      // set the building to be constructed
      const clonedBuildingsData = cloneBasicObjectWithJSON(buildings);
      clonedBuildingsData[buildingType].underConstruction = true;
      setBuildings(clonedBuildingsData);

      // reduce the resources according to costs
      const clonedResourcePool = cloneBasicObjectWithJSON(resourcePool);
      updateResourcePool(costsObject, clonedResourcePool, 1);

      setResourcePool(clonedResourcePool);
    } else {
      alert("Not enough resources!");
    }
  };

  const redText = "text-red-600";
  const greenText = "text-green-500";

  return (
    <CardTemplate color="blue">
      <CardImageHeaderDescriptionContainer
        cardName={buildings[buildingType].name}
        bgImage={buildings[buildingType].bgImage}
      >
        {buildings[buildingType].description}
      </CardImageHeaderDescriptionContainer>

      <CardCostsInfo
        resources={resources}
        resourcePool={resourcePool}
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
