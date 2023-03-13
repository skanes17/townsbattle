import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { NavButtonType } from "../../../types/NavButtons";
import { TipsSeen, TutorialCategory } from "../../../types/TutorialTypes";

interface ModalProps {
  bgImage?: string;
  tutorialCategory: TutorialCategory;
  markTipAsSeen: (tutorialCategory: TutorialCategory) => void;
  children: ReactNode;
}

export function Modal({
  bgImage,
  tutorialCategory,
  markTipAsSeen,
  children,
}: ModalProps) {
  return (
    <div className="pointer-events-auto fixed inset-0 z-50 text-sm sm:text-base lg:text-xl xl:text-2xl">
      {/* allows user to click outside to close the modal when paired with an onClick event */}
      <div
        className="fixed inset-0 h-full w-full bg-black/25 backdrop-blur-[2px]"
        /* turns off the tip after it's seen once */
        onClick={() => markTipAsSeen(tutorialCategory)}
      ></div>

      <div className="flex min-h-screen items-center">
        <div className="relative mx-auto max-h-[70vh] w-5/6 max-w-sm overflow-y-auto rounded-2xl border-2 border-zinc-600 bg-zinc-800/[98%] p-4 shadow-md sm:h-auto sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl">
          <div className="relative max-h-[80%] p-2 sm:max-h-[90%]">
            {/* <ModalHeader> and <ModalTextContent> should go here when <Modal> is called */}
            {children}
            <button
              type="button"
              className="absolute top-0 right-0 rounded-lg bg-zinc-700 p-2 text-amber-400 opacity-80 hover:bg-amber-400 hover:text-zinc-700 hover:opacity-100 focus:scale-[85%]"
              onClick={() => markTipAsSeen(tutorialCategory)}
            >
              <svg
                className="h-[0.875rem] w-[0.875rem] sm:h-4 sm:w-4 lg:h-5 lg:w-6 xl:h-6 xl:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label="Close"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
