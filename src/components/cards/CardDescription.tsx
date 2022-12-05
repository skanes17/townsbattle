interface CardDescriptionProps {
  descriptionText: any;
}

export default function CardDescription({
  descriptionText,
}: CardDescriptionProps) {
  return (
    <div className="margin-auto col-span-3 mx-4 my-2 flex h-auto items-center justify-center rounded-sm border-slate-300 bg-amber-100 p-2 text-center text-sm italic shadow-md">
      {descriptionText}
    </div>
  );
}
