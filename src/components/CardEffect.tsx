interface CardEffectProps {
  effectText: string;
}

export default function CardEffect({ effectText }: CardEffectProps) {
  return (
    <div className="col-span-3 mx-4 h-28 rounded-sm border-slate-300 bg-amber-100 p-2 italic shadow-md">
      {effectText}
    </div>
  );
}
