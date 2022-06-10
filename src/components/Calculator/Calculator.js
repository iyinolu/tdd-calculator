import React, { Component } from "react";
import "../../styles/Calculator.css"

class Calculator extends Component {
  state = {
    displayValue: "0",
    numbers: [],
    operators: [],
    selectedOperator: "",
    storedValue: "",
  };

  callOperator = () => {
    console.log("call operation");
  };

  setOperator = () => {
    console.log("set operation");
  };

  updateDisplay = () => {
    console.log("update display");
  };

  render = () => {
      return (
          <div className="calculator-container">
          </div>
      )
  }
}

export default Calculator;
