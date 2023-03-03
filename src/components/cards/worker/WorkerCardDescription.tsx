import { Resources, BaseResourceType } from "../../../types";

interface WorkerCardDescriptionProps {
  bgImage: string;
  resources: Resources;
  resourceType: BaseResourceType;
}

export default function WorkerCardDescription({
  bgImage,
  resources,
  resourceType,
}: WorkerCardDescriptionProps) {
  const bg = bgImage;

  return (
    // TODO: Get a good width!
    <div
      className={`${bg} m-2 flex aspect-square w-32 items-center rounded-lg border-zinc-900/50 bg-contain`}
    >
      <div className="m-auto w-3/4 rounded-sm border-slate-300 bg-slate-300/90 p-2 text-center text-sm font-semibold text-black opacity-0 shadow-md backdrop-grayscale transition-all ease-in-out group-hover:opacity-100 group-active:opacity-100">
        Gather {resources[resourceType].multiplier}{" "}
        {resources[resourceType].name} for every worker.
      </div>
    </div>
  );
}

// Old style with box for description
{
  /* <div className="margin-auto mx-4 my-1 flex h-auto items-center justify-center rounded-sm border-slate-300 bg-slate-300/80 p-2 text-center text-sm font-semibold text-black shadow-md"> */
}

/*  <div className="aspect-square">
      <div className="margin-auto mx-4 my-1 flex h-auto items-center justify-center border-b border-slate-400 p-2 text-center text-sm font-semibold text-white opacity-0 transition-all ease-in-out group-hover:opacity-100">
        Gather {resources[resourceType].multiplier}{" "}
        {resources[resourceType].name} for every worker.
      </div>
    </div> */
