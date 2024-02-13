import React from "react";
import PropTypes from 'prop-types';
import Styles from "./Image.module.css";
function Image({ src, alt, className , loading, width, height}) {
  
  return (
    <picture>
      <img
      width={width}
      height={height}
      src={src}
      alt={alt}
      className={className}
      loading={loading} // Use the loading attribute to enable lazy loading
    />
    </picture>
  );
}
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  loading: PropTypes.string
}

Image.defaultProps = {
  className: '',
  loading: 'lazy',
  width: '100%',
  height: '100%'
}

export default Image;
