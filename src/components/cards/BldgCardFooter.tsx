interface BldgCardFooterProps {
  /* could add attack here */
  tier: number;
  health: number;
}

export default function BldgCardFooter({ tier, health }: BldgCardFooterProps) {
  return (
    <div className="grid auto-cols-auto grid-cols-3 gap-2 border-t border-white/10 pt-1 backdrop-blur-sm">
      <div></div>
      <div className="text-md flex items-center justify-center rounded-t-lg bg-black/50 px-1 text-white">
        Tier {tier}
      </div>
      <div className="text-md flex items-center justify-center rounded-lg bg-black/50 px-1 text-white">
        ❤️{health}
      </div>
    </div>
  );
}
