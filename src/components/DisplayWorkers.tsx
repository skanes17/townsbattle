import React from "react";
import { Resources } from "../types/Resources";
import Worker from "./Worker";

interface DisplayWorkersProps {
  resources: Resources;
  setResources: any;
}

export default function DisplayWorkers({
  resources,
  setResources,
}: DisplayWorkersProps) {
  return (
    <div className="p-4 border border-blue-900">
      <div className="font-bold">Assign Workers</div>

      <div className="flex space-x-2">
        {/* This gets all the keys excluding "freeworkers" */}
        {Object.keys(resources)
          .filter((key) => key != "freeworkers")
          .map((resourceType: string) => (
            <Worker
              /* name={resources[resourceType].name}
            workerType={resources[resourceType].workerType} */
              resources={resources}
              setResources={setResources}
              resourceType={resourceType}
            />
          ))}
      </div>
    </div>
  );
}

{
  /* <div className="bg-white text-black w-52 h-72 border-4 border-blue-900 rounded-md shadow-md shadow-gray-500/50 grid grid-cols-3 gap-1">
            <div className="flex justify-center items-center h-8 bg-indigo-200 text-lg font-bold mx-2 rounded-b-md col-span-3">
              {buildings[buildingType].name}
            </div>
            <div className="flex justify-center items-center h-16 col-span-3">
              <img
                className="mx-auto w-16 h-16"
                src={townCenter}
                alt={`building`}
              />
            </div>
            <div className="mx-4 p-1 h-28 shadow-sm bg-amber-100 border-slate-300 rounded-sm col-span-3">
              {buildings[buildingType].effect}
            </div>

            <div></div>
            <div className="bg-slate-800 text-md mt-4 px-1 rounded-t-lg text-white justify-self-center place-self-end">
              Tier {buildings[buildingType].tier}
            </div>
            <div className="bg-slate-800 text-md mt-4 px-1 rounded-tl-lg text-white place-self-end">
              ❤️{buildings[buildingType].health}
            </div>
          </div>
      </div> */
}
