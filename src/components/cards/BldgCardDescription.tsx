interface BldgCardDescriptionProps {
  descriptionText?: string;
}

export default function BldgCardDescription({
  descriptionText,
}: BldgCardDescriptionProps) {
  return (
    <div className="margin-auto mx-4 mb-2 mt-28 flex h-auto items-center justify-center rounded-sm border-slate-300 bg-slate-300/90 p-2 text-center text-sm font-semibold text-black opacity-0 shadow-md transition-all ease-in-out group-hover:opacity-100">
      {descriptionText ?? ""}
    </div>
  );
}

/* 
<span className="pointer-events-none absolute top-16 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-center text-xs text-white opacity-0 before:absolute before:border-transparent before:border-t-black group-hover:opacity-100 sm:text-xs lg:text-sm xl:text-sm"></span>
*/
