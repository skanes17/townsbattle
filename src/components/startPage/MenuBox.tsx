import React, { ReactNode } from "react";

interface MenuBoxProps {
  // TODO: DRY
  icon: "▶️" | "🆕" | "💾" | "🏆" | "⚙️" | "❓" | "⭐";
  headerText: string;
  children: ReactNode;
}

export default function MenuBox({ icon, headerText, children }: MenuBoxProps) {
  return (
    <div className="fixed inset-0 z-50 text-sm sm:text-base">
      {/*
    allows user to click outside to close the modal when paired with an onClick event
    <div className="fixed inset-0 h-full w-full bg-black opacity-40"></div>
    */}
      <div className="flex min-h-screen items-center bg-black/25 px-4 py-8 backdrop-blur-[2px]">
        <div className="grid-rows-min mx-auto grid max-h-[70vh] w-full max-w-lg overflow-y-auto rounded-lg border-2 border-zinc-600 bg-zinc-800 p-4 shadow-lg sm:h-auto sm:max-w-xl sm:grid-cols-[1fr_9fr]">
          <div className="relative mx-auto h-12 w-12 rounded-full bg-zinc-400/40">
            <span className="absolute inset-0 flex items-center justify-center font-emoji">
              {icon}
            </span>
          </div>
          <div className="mt-2 text-center sm:ml-4 sm:text-left">
            <h4 className="text-xl font-semibold sm:text-2xl">{headerText}</h4>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
