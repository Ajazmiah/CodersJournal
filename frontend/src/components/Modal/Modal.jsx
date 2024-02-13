

import React , {useContext}from "react";
import styles from './Modal.module.css'
import { modalContext } from "../../context/modalContext";

const Modal = ({ children }) => {


  const [isModalOpen, setOpenModal] = useContext(modalContext)


  return (
    <div
      onClick={() => setOpenModal(false)}
      className={styles.rectangularModalOverlay}
    >
      <div
        className={styles.rectangularModal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};



export default Modal;
