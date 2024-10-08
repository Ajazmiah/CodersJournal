import React, { useContext } from "react";
import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const ModalRectangular = ({ children, handleCancel, handleBackdrop }) => {
  return (
    <Backdrop handleBackdrop={handleBackdrop}>
      <div
        className={styles.rectangularModal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </Backdrop>
  );
};

export default ModalRectangular;
