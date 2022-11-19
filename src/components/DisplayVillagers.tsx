import React from "react";
import { Resources } from "../types/Resources";
import Villager from "./Villager";

interface DisplayVillagersProps {
  resources: Resources;
  setResources: any;
  freeworkers: number;
  setFreeworkers: any;
  woodcutters: number;
  setWoodcutters: any;
  stonemasons: number;
  setStonemasons: any;
  metalworkers: number;
  setMetalworkers: any;
}

export default function DisplayVillagers(props: DisplayVillagersProps) {
  return (
    <div className="workers">
      <div style={{ fontWeight: "bold" }}>Workers</div>
      <Villager
        type="🪓 Woodcutters"
        workers={props.resources.woodcutters}
        setWorkers={props.setWoodcutters}
        freeworkers={props.resources.freeworkers}
        setFreeworkers={props.setFreeworkers}
      />
      <Villager
        type="⚒️ Stonemasons"
        workers={props.stonemasons}
        setWorkers={props.setStonemasons}
        freeworkers={props.freeworkers}
        setFreeworkers={props.setFreeworkers}
      />
      <Villager
        type="🥽 Metalworkers"
        workers={props.metalworkers}
        setWorkers={props.setMetalworkers}
        freeworkers={props.freeworkers}
        setFreeworkers={props.setFreeworkers}
      />
    </div>
  );
}
