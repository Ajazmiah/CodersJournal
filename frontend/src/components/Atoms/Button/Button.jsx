import React from "react";

function Button({ children, backgroundColor, onClick }) {
  const buttonStyle = {
    border: "none",
    width: "100px",
    marginBottom: "10px",
    fontSize: ".8em",
    background: backgroundColor,
    color: "white",
    padding: ".5em",
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
