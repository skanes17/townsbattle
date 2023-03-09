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
  // if it's a resource, don't show the background
  // TODO: if a better image is found, could use it
  const isAResource = Object.keys(countsObject).includes("wood");

  /* @ts-ignore */
  const bg: string = isAResource ? `` : dataObject[type].bgImageSm;
  const border = isAResource ? `border-0` : `border`;

  return (
    <div className="group flex h-7 flex-row align-middle sm:h-8 lg:h-9">
      {/* Could add bgImage here later if desired */}
      <div
        className={`${
          !isAResource && `mr-2`
        } h-7 w-7 rounded-lg ${border} border-zinc-700 group-hover:border-yellow-300 sm:h-8 sm:w-8 lg:h-9 lg:w-9 ${bg} bg-cover bg-center`}
      >
        {/* FIXME: */}
        {/* @ts-ignore */}
        {isAResource && dataObject[type].symbol}
      </div>
      <div className="text-right group-hover:text-yellow-300">
        {/* @ts-ignore */}
        {countsObject[type]}
      </div>
    </div>
  );
}
