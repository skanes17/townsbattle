import { BaseResourceType, Resources } from "../../../types";

interface WorkerAssignCollectProps {
  resources: Resources;
  resourceType: BaseResourceType;
}

export default function WorkerAssignCollect({
  resources,
  resourceType,
}: WorkerAssignCollectProps) {
  let countStyle;
  if (resources[resourceType].workers > 0) {
    countStyle = "font-bold text-amber-400";
  }

  return (
    <>
      {/* TODO: Add something like this */}
      {/* <span className="rounded-sm border border-white/25 pl-2 text-center">
        Tier 1
      </span> */}

      <div className="grid grid-cols-2 pl-2">
        <div className="font-bold">Assigned</div>
        <div className="self-center justify-self-center">
          {resources["workers"].symbol}{" "}
          <span className={`${countStyle}`}>
            {resources[resourceType].workers}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 pl-2">
        <div className="font-bold">To Collect</div>
        <div className="self-center justify-self-center">
          {resources[resourceType].symbol}{" "}
          <span className={`${countStyle}`}>
            {resources[resourceType].workers *
              resources[resourceType].multiplier}
          </span>
        </div>
      </div>
    </>
  );
}
