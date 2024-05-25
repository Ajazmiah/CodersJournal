

import React , {useContext}from "react";
import styles from './Modal.module.css'
import { backdropContext } from "../../context/backdropContext";
import Backdrop from "../Backdrop/Backdrop";

const ModalRectangular = ({ children }) => {


  const [isBackdropOpen, setOpenBackdrop] = useContext(backdropContext)

  


  return (
  
      <div
        className={styles.rectangularModal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>

  );
};





export default ModalRectangular;
