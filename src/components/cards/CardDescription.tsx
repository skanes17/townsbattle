interface CardDescriptionProps {
  descriptionText: any;
}

export default function CardDescription({
  descriptionText,
}: CardDescriptionProps) {
  return (
    <div className="col-span-3 mx-4 h-auto rounded-sm border-slate-300 bg-amber-100 p-2 text-sm italic shadow-md">
      {descriptionText}
    </div>
  );
}
