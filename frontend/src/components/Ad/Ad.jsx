import React from "react";
import Styles from "./Ad.module.css";

function Ad({ link, title, image }) {
  return (
    <div  className={Styles.ad}>
        <span className={Styles.sponsored}> sponsored</span>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={title} />
      </a>
    </div>
  );
}

export default Ad;
