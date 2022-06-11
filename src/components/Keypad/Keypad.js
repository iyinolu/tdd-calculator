import React from "react";
import PropTypes from "prop-types";
import Key from "../Key/Key";
import "../../styles/Keypad.css"

const Keypad = ({
  callOperator,
  numbers,
  operators,
  setOperator,
  updateDisplay,
}) => {
  const renderValues = (values) =>
    values.map((number, key) => <p key={key}>{number}</p>);

  return (
    <div className="keypad-container">
      <div className="numbers-container">{renderValues(numbers)}</div>
      <div className="operators-container">{renderValues(operators)}</div>
      <Key />
    </div>
  );
};

Keypad.propTypes = {
  callOperator: PropTypes.func.isRequired,
  numbers: PropTypes.array.isRequired,
  operators: PropTypes.array.isRequired,
  setOperator: PropTypes.func.isRequired,
  updateDisplay: PropTypes.func.isRequired,
};

export default Keypad;
