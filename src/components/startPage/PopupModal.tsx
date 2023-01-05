import React from "react";
import { MenuIcon } from "../../types/Menu";

interface PopupModalProps {
  /* FIXME: Import this icon from the type -- DRY */
  icon: "▶️" | "🏆" | "🔧" | "❓" | "⭐";
  headerText: string;
  children: any;
  onClick1: () => void;
  onClick2: () => void;
}

export default function PopupModal({
  icon,
  headerText,
  onClick1,
  onClick2,
  children,
}: PopupModalProps) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {/*
    allows user to click outside to close the modal
    <div className="fixed inset-0 h-full w-full bg-black opacity-40"></div>
    */}
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-lg rounded-md bg-white p-4 shadow-lg">
          <div className="mt-3 sm:flex">
            <div className="mx-auto flex h-12 w-12 flex-none items-center justify-center rounded-full bg-blue-100">
              {icon}
            </div>
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <h4 className="text-lg font-medium text-gray-800">
                {headerText}
              </h4>
              {children}
              <div className="mt-3 items-center gap-2 sm:flex">
                <button
                  className="mt-2 w-full flex-1 rounded-md border p-2.5 text-gray-800 outline-none ring-indigo-600 ring-offset-2 focus:ring-2"
                  onClick={onClick1}
                >
                  Cancel
                </button>
                <button
                  className="mt-2 w-full flex-1 rounded-md bg-blue-600 p-2.5 text-white outline-none ring-blue-600 ring-offset-2 focus:ring-2"
                  onClick={onClick2}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
