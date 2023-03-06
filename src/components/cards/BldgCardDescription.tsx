interface BldgCardDescriptionProps {
  descriptionText?: string;
}

export default function BldgCardDescription({
  descriptionText,
}: BldgCardDescriptionProps) {
  /* TODO: Fix building hovertext */
  return (
    <div className="margin-auto mx-4 mb-2 mt-28 flex items-center justify-center rounded-sm border-slate-300 bg-slate-300/90 p-2 text-center text-sm font-semibold text-black opacity-0 shadow-md transition-all ease-in-out group-hover:opacity-100">
      {descriptionText ?? ""}
    </div>
  );
}
