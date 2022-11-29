interface CardFooterProps {
  /* could add attack here */
  tier: number;
  health: number;
}

export default function CardFooter({ tier, health }: CardFooterProps) {
  return (
    <>
      <div></div>
      <div className="bg-slate-800 text-md mt-4 px-1 rounded-t-lg text-white justify-self-center place-self-end">
        Tier {tier}
      </div>
      <div className="bg-slate-800 text-md mt-4 px-1 rounded-tl-lg text-white place-self-end">
        ❤️{health}
      </div>
    </>
  );
}
