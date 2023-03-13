import React, { useEffect, useState } from "react";
import { TutorialMessages } from "../../../gameData";
import { ModalHeader } from "./ModalHeader";
import { ModalTextContent } from "./ModalTextContent";

export function TutorialModalAsSection() {
  return (
    <>
      <div className="relative mx-auto mt-4 max-h-[70vh] w-full max-w-sm overflow-y-auto rounded-2xl border-2 border-zinc-600 bg-zinc-800/[98%] p-4 text-sm shadow-md sm:h-auto sm:max-w-md sm:text-base md:max-w-xl lg:max-w-3xl lg:text-xl xl:max-w-5xl xl:text-2xl">
        <div className="max-h-[80%] p-2 sm:max-h-[90%]">
          {Object.keys(TutorialMessages).map((tutorialCategory) => (
            <section>
              <ModalHeader
                headerText={TutorialMessages[tutorialCategory].category}
              />
              <ModalTextContent
                children={TutorialMessages[tutorialCategory].tutorial}
              />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
