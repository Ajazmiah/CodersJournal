import React from "react";

function useScreenSize() {
  let DEVICE = "mobile";
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  if (windowSize <= 600) {
    DEVICE = "mobile";
  }
  if (windowSize > 600 && windowSize < 800) {
    DEVICE = "tablet";
  }

  if (windowSize > 800 && windowSize < 1200) {
    DEVICE = "desktop";
  }

  if (windowSize > 1200) {
    DEVICE = "large";
  }

  return DEVICE;
}

export default useScreenSize;
