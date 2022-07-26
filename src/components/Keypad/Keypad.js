import React from "react";
import PropTypes from "prop-types";
import Key from "../Key/Key";
import "../../styles/Keypad.css";

const Keypad = ({
  callOperator,
  numbers,
  operators,
  setOperator,
  updateDisplay,
}) => {
  const renderKeys = (values, type) => {
    return values.map((value, key) => (
      <Key
        key={key}
        keyType={type === "numbers" ? "number-key" : "operator-key"}
        keyAction={type === "numbers" ? updateDisplay : setOperator}
        keyValue={value}
      />
    ));
  };

  return (
    <div className="keypad-container">
      <div className="numbers-container">{renderKeys(numbers, "numbers")}</div>
      <div className="operators-container">
        {renderKeys(operators, "operators")}
      </div>
      <div className="submit-container">
          <Key
            keyAction={callOperator}
            keyType={"submit-key"}
            keyValue="=" 
          />
      </div>
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
