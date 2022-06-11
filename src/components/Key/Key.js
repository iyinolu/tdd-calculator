import React from "react";
import PropTypes from "prop-types";
import "../../styles/Key.css";

const Key = ({ keyAction, keyType, keyValue }) => {
  return (
    <div className={`key-container ${keyType}`} onClick={() => keyAction(keyValue)}>
      <p className="key-value">{keyValue}</p>
    </div>
  );
};

Key.propTypes = {
  keyValue: PropTypes.string.isRequired,
  keyAction: PropTypes.func.isRequired,
  keyType: PropTypes.string.isRequired,
};

Key.defaultProps = {
  keyValue: "",
  keyType: "number",
  keyAction: () => {},
};

export default Key;
