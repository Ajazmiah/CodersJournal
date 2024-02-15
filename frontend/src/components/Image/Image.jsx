import React from "react";
import PropTypes from 'prop-types';
import Styles from "./Image.module.css";







const removeExtension = (src) => {

  let extensionType = src.slice(-4)

  if (!src.slice(-4).includes('.')) {
    extensionType = '.jpeg'
  }

  if (extensionType === '.png' || extensionType === '.jpg' || extensionType === '.jpeg') {

    return src.split(extensionType)[0]
  }

  return src
}


function Image({ src, alt, className, loading, width, height }) {

  const imageSrc = src || 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF'
  return (
    <picture>
      <source
        srcSet={`${removeExtension(imageSrc)}.webp`}
        type="image/webp"
      />
      <img
        width={width}
        height={height}
        src={`${removeExtension(imageSrc)}.jpg`}
        alt={alt}
        loading={loading || 'lazy'} // Use the loading attribute to enable lazy loading
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
