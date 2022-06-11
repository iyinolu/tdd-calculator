import React, { Component } from "react";
import Display from "../Display/Display";
import "../../styles/Calculator.css"
import Keypad from "../Keypad/Keypad";

class Calculator extends Component {
  state = {
    displayValue: "0",
    numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0','ce'],
    operators: ['/', 'x', '-', '+'],
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
              <Display />
              <Keypad 
                callOperator={this.callOperator}
                numbers={this.state.numbers}
                operators={this.state.operators}
                setOperator={this.setOperator}
                updateDisplay={this.updateDisplay}
              />
          </div>
      )
  }
}

export default Calculator;
