interface CardDescriptionProps {
  descriptionText?: string;
}

export default function CardDescription({
  descriptionText,
}: CardDescriptionProps) {
  return (
    <div className="margin-auto col-span-3 mx-4 my-2 flex h-auto items-center justify-center rounded-sm border-slate-300 bg-slate-300 p-2 text-center text-sm text-black shadow-md">
      {typeof descriptionText === undefined ? "" : descriptionText}
    </div>
  );
}

/* 
<span className="pointer-events-none absolute top-16 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-center text-xs text-white opacity-0 before:absolute before:border-transparent before:border-t-black group-hover:opacity-100 sm:text-xs lg:text-sm xl:text-sm"></span>
*/
