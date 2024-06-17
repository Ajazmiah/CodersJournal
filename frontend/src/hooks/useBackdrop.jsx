import React, {useState} from 'react'

function useBackdrop() {

    const [showMenu, setShowMenu] = useState(false);

    
  const handleBackdrop = () => {
    setShowMenu((prev) => !prev);
  };

  return [showMenu , handleBackdrop]
  
}

export default useBackdrop