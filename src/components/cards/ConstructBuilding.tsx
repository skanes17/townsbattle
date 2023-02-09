import React, { Dispatch, SetStateAction } from "react";
import {
  BuildingCosts,
  Buildings,
  BuildingType,
  Resources,
  ResourceType,
} from "../../types/";
import { AddRemoveButton } from "../buttons";
import {
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
  buildingCosts: BuildingCosts;
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

  const redText = "text-red-600";
  const greenText = "text-green-500";

  return (
    <CardTemplate color="blue">
      <CardHeader cardName={buildings[buildingType].name} />
      <CardSymbol cardSymbol={buildings[buildingType].nameSymbol} />
      <CardDescription descriptionText={buildings[buildingType].description} />

      {/* FIXME: This section is identical to one in TrainUnitCard. Make a shared component!! */}
      <div className="grid auto-rows-auto grid-cols-[min-content_1fr] pl-2">
        <div className="col-span-1 col-start-1 font-bold">Cost</div>
        <div className="col-span-1 col-start-2 ml-4 grid auto-rows-auto pr-2 text-right text-lg">
          {Object.keys(resources).map(
            (resourceType) =>
              /* If this resource is required, show its cost */
              buildingCosts[buildingType][resourceType as ResourceType] > 0 && (
                <div>
                  {resources[resourceType as ResourceType].resourceSymbol}
                  <span
                    className={
                      /* if you have enough resources of that type, show green; otherwise red" */
                      resources[resourceType as ResourceType].collected <
                      buildingCosts[buildingType][resourceType as ResourceType]
                        ? `${redText} px-1`
                        : `${greenText} px-1`
                    }
                  >
                    {resources[resourceType as ResourceType].collected}
                  </span>
                  /
                  <span className={`px-1`}>
                    {buildingCosts[buildingType][resourceType as ResourceType]}
                  </span>
                </div>
              )
          )}
        </div>
      </div>

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
