import React, { createContext, useState } from "react";

export const backdropContext = createContext();
const BackdropContext = ({ children }) => {
  
  
  const [isBackdropOpen, setOpenBackdrop] = useState(false);

  return (
    <backdropContext.Provider value={[isBackdropOpen, setOpenBackdrop]}>
      {children}
    </backdropContext.Provider>
  );
};

export default BackdropContext;