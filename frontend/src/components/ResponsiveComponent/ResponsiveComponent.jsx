// ResponsiveComponent.js
import React from 'react';
import useWindowSize from  '../../hooks/useScreenSize'

const ResponsiveComponent = ({ renderOn, children }) => {
  const device  = useWindowSize();

  return renderOn.includes(device) ? <>{children}</> : null;
};

export default ResponsiveComponent;
