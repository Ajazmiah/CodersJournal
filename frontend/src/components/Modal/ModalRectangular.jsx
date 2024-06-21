

import React , {useContext}from "react";
import styles from './Modal.module.css'
import { backdropContext } from "../../context/backdropContext";
import Backdrop from "../Backdrop/Backdrop";

const ModalRectangular = ({ children, handleCancel }) => {


    return (
  
      <Backdrop>
        <div
        className={styles.rectangularModal}>
        {children}
        <button onClick={handleCancel}>Cancel</button>
      </div>
      </Backdrop>

  );
};





export default ModalRectangular;
