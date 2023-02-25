import { Resources, BaseResourceType } from "../../../types";

interface WorkerCardDescriptionProps {
  resources: Resources;
  resourceType: BaseResourceType;
}

export default function WorkerCardDescription({
  resources,
  resourceType,
}: WorkerCardDescriptionProps) {
  return (
    <div className="margin-auto mx-4 my-1 flex h-auto items-center justify-center border-b border-slate-400 p-2 text-center text-sm font-semibold text-white">
      Gather {resources[resourceType].multiplier} {resources[resourceType].name}{" "}
      for every worker.
    </div>
  );
}

// Old style with box for description
{
  /* <div className="margin-auto mx-4 my-1 flex h-auto items-center justify-center rounded-sm border-slate-300 bg-slate-300/80 p-2 text-center text-sm font-semibold text-black shadow-md"> */
}
