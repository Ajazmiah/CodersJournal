

import React , {useContext}from "react";
import styles from './Modal.module.css'
import { backdropContext } from "../../context/backdropContext";
import Backdrop from "../Backdrop/Backdrop";

const ModalRectangular = ({ children }) => {


  const [isBackdropOpen, setOpenBackdrop] = useContext(backdropContext)

  


  return (
    <Backdrop
      onClick={() => setOpenBackdrop(false)}
      
    >
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
