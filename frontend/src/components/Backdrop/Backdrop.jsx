import React, { useState } from "react";
import styles from "./Backdrop.module.css";
import ReactDom from "react-dom";

export const useBackdrop = () => {
  const [backdrop, setBackdrop] = useState(false);

  const handleBackdrop = () => {
    setBackdrop((prev) => !prev);
  };

  return { backdrop, setBackdrop, handleBackdrop };
};

function Backdrop({ children, handleBackdrop }) {
  return ReactDom.createPortal(
    <div className={styles.backdrop} onClick={handleBackdrop}>
      {children}
    </div>,
    document.getElementById("portal")
  );
}

export default Backdrop;
