import React from "react";

// TODO: Figure out why first click doesn't add a unit

// @ts-ignore
export default function AddUnitButton({ addUnitFunction, name, className }) {
  return (
    <>
      <button onClick={addUnitFunction} className={className}>
        Train {name}
      </button>
    </>
  );
}
