import React from "react";
import { Routes, Route } from "react-router-dom";
import StartPage from "./startPage/StartPage";

export default function App() {
  return (
    <div className="bg-zinc-900 font-sans text-stone-200">
      <StartPage />
      {/* <StartPage /> */}
    </div>
  );
}
