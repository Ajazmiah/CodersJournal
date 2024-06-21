import React, { useContext } from "react";
import styles from "./Modal.module.css";
import { backdropContext } from "../../context/backdropContext";
import Backdrop from "../Backdrop/Backdrop";

const ModalRectangular = ({ children, handleCancel,handleShow }) => {
  return (
    <Backdrop handleShow={handleShow}>
      <div className={styles.rectangularModal}  onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </Backdrop>
  );
};

export default ModalRectangular;
