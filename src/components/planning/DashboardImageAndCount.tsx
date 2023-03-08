import React from "react";
import {
  BaseResourceType,
  BaseUnit,
  ResourcePool,
  Resources,
  UnitCounts,
  UnitType,
} from "../../types";

interface DashboardImageAndCount {
  dataObject: BaseUnit | Resources;
  countsObject: UnitCounts | ResourcePool;
  type: UnitType | keyof Resources | BaseResourceType;
}

export default function DashboardImageAndCount({
  dataObject,
  countsObject,
  type,
}: DashboardImageAndCount) {
  /* @ts-ignore */
  const bg: string = dataObject[type].bgImageSm;

  return (
    <div className="group flex flex-row align-middle md:h-8 lg:h-9">
      <div
        className={`mr-2 rounded-lg border border-zinc-700 group-hover:border-yellow-300 md:h-8 md:w-8 lg:h-9 lg:w-9 ${bg} bg-cover bg-center`}
      ></div>
      <div className="text-right group-hover:text-yellow-300">
        {/* @ts-ignore */}
        {countsObject[type]}
        {/* {resourcePool[resourceType]}   {resourcePool[resourceType]}   {unitCounts[unitType]} */}
      </div>
    </div>
  );
}
