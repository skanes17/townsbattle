import React from "react";
import Villager from "./Villager";

interface DisplayVillagersProps {
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
        workers={props.woodcutters}
        setWorkers={props.setWoodcutters}
        freeworkers={props.freeworkers}
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
