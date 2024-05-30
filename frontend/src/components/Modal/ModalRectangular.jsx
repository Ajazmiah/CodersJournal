

import React , {useContext}from "react";
import styles from './Modal.module.css'
import { backdropContext } from "../../context/backdropContext";
import Backdrop from "../Backdrop/Backdrop";

const ModalRectangular = ({ children }) => {


    return (
  
      <div
        className={styles.rectangularModal}>
        {children}
      </div>

  );
};





export default ModalRectangular;
