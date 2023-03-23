import { Dispatch, SetStateAction } from "react";

interface WarningButtonProps {
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
  incrementPopupCounter: () => void;
}

export default function WarningButton({
  counter,
  setCounter,
  incrementPopupCounter,
}: WarningButtonProps) {
  let buttonText, buttonStyle;
  switch (counter) {
    case 0:
      buttonText = "Delete";
      buttonStyle = `bg-red-600 font-semibold`;
      break;
    case 1:
      buttonText = "Are you SURE?";
      buttonStyle = `animate-jiggleSmall bg-[#9E1A1A] font-bold`;
      break;
    case 2:
      buttonText = "Last Chance!";
      buttonStyle = `bg-[#2e1414] font-bold`;
      break;
    case 3:
      buttonText = "⭐ All Saved Data Deleted ⭐";
      buttonStyle = `bg-green-800 font-semibold`;
      break;
    default:
      buttonText = "⭐ All Saved Data Deleted ⭐";
      buttonStyle = `bg-green-800 font-semibold`;
      break;
  }

  return (
    <>
      <button
        type="button"
        className={`${buttonStyle} w-3/4 flex-1 rounded-md border p-2.5 outline-transparent ring-offset-2 transition-transform ease-in `}
        onClick={
          counter < 2
            ? () => incrementPopupCounter()
            : () => {
                localStorage.clear();
                incrementPopupCounter();
              }
        }
      >
        {buttonText}
      </button>
    </>
  );
}
