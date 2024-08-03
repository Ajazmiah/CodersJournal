import React from "react";
import PropTypes from "prop-types";
import Styles from "./Image.module.css";

const removeExtension = (src) => {
  // Match known file extensions at the end of the string
  const match = src?.match(/\.(png|jpg|jpeg|webp)$/i);

  if (!match) {
    // Return the original string if no known extension is found
    return src;
  }

  const extensionType = match[0];

  // Remove the extension from the URL and return
  return src.slice(0, -extensionType.length);
};

const IMG_EXTENSIONS = ["webp", "jpeg", "png", "jpg"];

function Image({ src, alt, className, loading, width, height }) {
  return (
    <picture>
      {IMG_EXTENSIONS.map((extn) => (
        <source
          key={extn}
          srcSet={`${removeExtension(src)}.${extn}`}
          type={`image/${extn}`}
        />
      ))}
      <img
        width={width}
        height={height}
        src={src}
        alt={alt}
        loading={loading || "lazy"} // Use the loading attribute to enable lazy loading
      />
    </picture>
  );
}
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  loading: PropTypes.string,
};

Image.defaultProps = {
  className: "",
  loading: "lazy",
  width: "100%",
  height: "100%",
};

export default Image;
