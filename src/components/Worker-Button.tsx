import React from "react";

export default function WorkerButton(props){
    return (
    <button onClick={() => props.handlePlusClick}>+</button>
    <button onClick={() => props.handleMinusClick}>-</button>
    )
}

// rip this apart and make it work