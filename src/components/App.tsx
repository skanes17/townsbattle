import React from "react";
import { Routes, Route } from "react-router";
import Game from "./Game";
import StartPage from "./startPage/StartPage";

export default function App() {
  return (
    <div className="bg-zinc-900 font-sans text-stone-200">
      <Routes>
        <Route path="/" element={<StartPage />}></Route>
      </Routes>
      {/* <StartPage /> */}
    </div>
  );
}
