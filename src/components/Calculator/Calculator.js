/* eslint-disable no-eval */
import React, { Component } from "react";
import Display from "../Display/Display";
import "../../styles/Calculator.css";
import Keypad from "../Keypad/Keypad";

class Calculator extends Component {
  state = {
    displayValue: "0",
    numbers: ["9", "8", "7", "6", "5", "4", "3", "2", "1", ".", "0", "ce"],
    operators: ["/", "x", "-", "+"],
    selectedOperator: "",
    storedValue: "",
  };

  callOperator = () => {
    let result;
    let { storedValue, selectedOperator, displayValue } = this.state;
    storedValue = parseFloat(storedValue);
    displayValue = parseFloat(displayValue);
    switch (selectedOperator) {
      case "+":
        result = storedValue + displayValue;
        break;
      case "-":
        result = storedValue - displayValue;
        break;
      case "/":
        result = storedValue / displayValue;
        break;
      case "x":
        result = storedValue * displayValue;
        break;
      default:
        result = 0;
    }
    if (result === Infinity || isNaN(result)) {
      result = 0;
    }
    this.setState({ displayValue: String(result) });
  };

  setOperator = (value) => {
    let { selectedOperator, storedValue, displayValue } = this.state;
    selectedOperator = value;
    storedValue = displayValue !== "0" ? this.state.displayValue : storedValue;
    displayValue = "0";

    this.setState({ selectedOperator, storedValue, displayValue });
  };

  updateDisplay = (value) => {
    let { displayValue } = this.state;
    if (value === "." && displayValue.includes(".")) {
      value = "";
    }
    if (value === "ce") {
      displayValue = displayValue.slice(0, -1);
    } else if (displayValue.length > 0) {
      displayValue = displayValue + value;
    }
    if (displayValue[0] === "0") {
      displayValue = displayValue.slice(1);
    }
    if (displayValue === "") {
      displayValue = "0";
    }

    this.setState({ displayValue });
  };

  render = () => {
    return (
      <div className="calculator-container">
        <Display displayValue={this.state.displayValue} />
        <Keypad
          callOperator={this.callOperator}
          numbers={this.state.numbers}
          operators={this.state.operators}
          setOperator={this.setOperator}
          updateDisplay={this.updateDisplay}
        />
      </div>
    );
  };
}

export default Calculator;
