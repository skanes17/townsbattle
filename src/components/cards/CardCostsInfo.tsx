import { ReactNode } from "react";

interface CardCostsInfoProps {
  costText: string;
  children: ReactNode;
}

export default function CardCostsInfo() {
  return;
  // <div className="grid auto-rows-auto grid-cols-2">
  // <div className="justify-self-start pl-2 font-bold">{costText}</div>
  // <div className={`justify-self-end pr-2 text-lg`}>
  //   🛠️{/**/}
  //   <span className={`${costColor} px-1`}>
  // {resources["freeworkers"].collected}
  //   </span>
  //   /
  //   <span className={`px-1`}>
  // {resources[resourceType].workersNeeded}
  //   </span>
  // </div>
  //   </div>
}
