interface CardEffectProps {
  effectText: string;
}

export default function CardEffect({ effectText }: CardEffectProps) {
  return (
    <div className="mx-4 p-2 italic h-28 shadow-md bg-amber-100 border-slate-300 rounded-sm col-span-3">
      {effectText}
    </div>
  );
}
