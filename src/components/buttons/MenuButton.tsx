import React from "react";

interface MenuButtonProps {
  buttonText: string;
  isSelected: boolean;
  buttonColor: "green" | "blue" | "red" | "deepRed";
  onClick?: () => void;
}

export default function MenuButton({
  buttonText,
  isSelected,
  buttonColor,
  onClick,
}: MenuButtonProps) {
  /* TODO: Could colors and color numbers be made into variables, concatenated when used in cLassName? */
  let textStyle: string;
  let buttonColors: string;
  let bgColor;

  isSelected ? (textStyle = "text-white") : (textStyle = "text-gray-800");

  const defaultBg = "bg-zinc-200 hover:bg-zinc-300";
  switch (buttonColor) {
    case "green":
      buttonColors = "ring-green-600 active:bg-green-500";
      bgColor = isSelected ? "bg-green-600" : defaultBg;
      break;
    case "blue":
      buttonColors = "ring-blue-600 active:bg-blue-500";
      bgColor = isSelected ? "bg-blue-600" : defaultBg;
      break;
    case "red":
      buttonColors = "ring-red-600 active:bg-red-500";
      bgColor = isSelected ? "bg-red-600" : defaultBg;
      break;
    case "deepRed":
      buttonColors = "ring-deepRed active:bg-deepRed";
      bgColor = isSelected ? "bg-deepRed" : defaultBg;
      break;
  }

  return (
    <>
      <button
        type="button"
        className={`w-3/4 flex-1 rounded-md border font-semibold ${bgColor} ${buttonColors} ${textStyle} m-[0.125rem] p-2.5 outline-transparent ring-offset-2 `}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </>
  );
}
