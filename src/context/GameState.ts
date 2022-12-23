import React from "react";

export const GameContext = React.createContext(null);

/*
when you want to use it, wrap your components using the following:
    <GameContext.Provider value={turn}>
    </GameContext.Provider>

the value={} is any stuff you want to be accessible to later components
*/
