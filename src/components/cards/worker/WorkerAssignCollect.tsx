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
        <div className="self-center text-sm font-bold sm:text-lg">Assigned</div>
        <div className="self-center justify-self-center text-sm sm:text-lg">
          <span className="font-emoji">{resources["workers"].symbol}</span>{" "}
          <span className={`${countStyle}`}>
            {resources[resourceType].workers}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 pl-2">
        <div className="self-center text-sm font-bold sm:text-lg">
          Collecting
        </div>
        <div className="self-center justify-self-center text-sm sm:text-lg">
          <span className="font-emoji">{resources[resourceType].symbol}</span>{" "}
          <span className={`${countStyle}`}>
            {resources[resourceType].workers *
              resources[resourceType].multiplier}
          </span>
        </div>
      </div>
    </>
  );
}
