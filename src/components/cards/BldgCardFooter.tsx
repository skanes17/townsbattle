interface BldgCardFooterProps {
  /* could add attack here */
  tier: number;
  health: number;
}

export default function BldgCardFooter({ tier, health }: BldgCardFooterProps) {
  return (
    <div className="col-span-full row-span-1 row-start-4 grid auto-cols-auto grid-cols-3 gap-2">
      <div></div>
      <div className="text-md mt-4 flex items-center justify-center rounded-t-lg bg-slate-800 px-1 text-white">
        Tier {tier}
      </div>
      <div className="text-md mt-4 flex items-center justify-center rounded-tl-lg bg-slate-800 px-1 text-white">
        ❤️{health}
      </div>
    </div>
  );
}
