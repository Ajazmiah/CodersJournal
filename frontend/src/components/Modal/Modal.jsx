

import React , {useContext}from "react";
import styles from './Modal.module.css'
import { modalContext } from "../../context/modalContext";
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({ children }) => {


  const [isModalOpen, setOpenModal] = useContext(modalContext)

  


  return (
    <Backdrop
      onClick={() => setOpenModal(false)}
      
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





export default Modal;
