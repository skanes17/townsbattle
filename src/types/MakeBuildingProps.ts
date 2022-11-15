export interface MakeBuildingProps {
  index: number;
  freeworkerName: "villagers";
  resource1Name: "wood" | "stone" | "metal";
  resource2Name: "wood" | "stone" | "metal";
  resource3Name?: "wood" | "stone" | "metal";
  buildings: any[];
  buildingName: string;
  setBuildings: any;
  freeworkers: number;
  setFreeworkers: any;
  freeworkerCost: number;
  resource1: number;
  resource2: number;
  resource3?: number;
  setResource1: any;
  setResource2: any;
  setResource3?: any;
  resource1Cost: number;
  resource2Cost: number;
  resource3Cost?: number;
  underConstruction: boolean;
}
