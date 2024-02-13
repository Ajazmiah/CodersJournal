import React, { createContext, useState } from "react";

export const modalContext = createContext();
const ModalContext = ({ children }) => {
  
  
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <modalContext.Provider value={[isOpenModal, setOpenModal]}>
      {children}
    </modalContext.Provider>
  );
};

export default ModalContext;