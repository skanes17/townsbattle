interface CombatButtonProps {
  buttonText: string;
  onClick: () => void;
}

export default function CombatButton({
  buttonText,
  onClick,
}: CombatButtonProps) {
  return (
    <button
      type="button"
      className="text-md h-full w-full rounded bg-blue-600 font-bold text-white shadow-md shadow-blue-600/50 duration-75 hover:bg-blue-800 sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl"
      onClick={() => onClick()}
    >
      {buttonText}
    </button>
  );
}
