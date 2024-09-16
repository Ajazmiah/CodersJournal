import React from "react";
import Styles from './Button.module.css'
import classNames from "classnames";

function Button({ children, color, onClick,classes, ...rest }) {

  

  return (
    <button {...rest} className={classNames(Styles[classes], Styles['button'])} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
