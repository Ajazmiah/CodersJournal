import React, { useState, useEffect } from "react";

function useScreenSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [device, setDevice] = useState();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

 

  useEffect(() => {
    if (windowSize.width <= 600) {
      setDevice("mobile");
    }
    if (windowSize.width > 600 && windowSize.width < 959) {
      setDevice("tablet");
    }

    if (windowSize.width > 960 && windowSize.width < 1260) {
      setDevice("desktop");
    }

    if (windowSize.width > 1270) {
      setDevice("large");
    }
  }, [windowSize]);

  return device;
}

export default useScreenSize;
