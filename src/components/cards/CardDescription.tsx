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
