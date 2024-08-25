import { RDS } from "aws-sdk";
import React from "react";

function Button({ children, backgroundColor, onClick, ...rest }) {
  const buttonStyle = {
    border: "none",
    marginBottom: "10px",
    fontSize: ".8em",
    background: backgroundColor,
    color: "white",
    padding: ".5em",
  };

  return (
    <button style={buttonStyle} {...rest} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
