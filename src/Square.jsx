import React from "react";
import "./style.css";

function Square(props) {
  return (
    <button className="square" onClick={() => props.onButtonClick()}>
      {props.value}
    </button>
  );
}

export default Square;
