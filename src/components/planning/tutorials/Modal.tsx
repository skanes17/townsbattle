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
        className="fixed inset-0 h-full w-full bg-black/50 backdrop-blur-[2px]"
        /* turns off the tip after it's seen once */
        onClick={() => markTipAsSeen(tutorialCategory)}
      ></div>

      <div className="flex min-h-screen items-center">
        <div className="relative mx-auto max-h-[70vh] w-full max-w-sm overflow-y-auto rounded-2xl border-2 border-zinc-600 bg-zinc-800/[98%] p-4 shadow-md sm:h-auto sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl">
          <div className="max-h-[80%] p-2 sm:max-h-[90%]">
            {/* <ModalHeader> and <ModalTextContent> should go here when <Modal> is called */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
