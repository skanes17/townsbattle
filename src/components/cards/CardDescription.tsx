interface CardDescriptionProps {
  descriptionText?: string;
}

export default function CardDescription({
  descriptionText,
}: CardDescriptionProps) {
  return (
    <div
      className={`margin-auto mx-4 my-1 flex h-auto items-center justify-center rounded-sm border-slate-300 bg-slate-300/80 p-2 text-center text-sm font-semibold text-black shadow-md`}
    >
      {descriptionText ?? ""}
    </div>
  );
}
