import React from "react";

function Button({ children, color, onClick }) {
  const buttonStyle = {
    border: "none",
    width: "100px",
    marginBottom: "10px",
    fontSize: ".8em",
    background: "#ff5252",
    color: "white",
    padding: ".5em",
  };

  return (
    <button className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
