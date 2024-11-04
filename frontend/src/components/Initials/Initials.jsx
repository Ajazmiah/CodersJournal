import React from "react";
import Styles from "./Initials.module.css";
import classNames from "classnames";

function Initials({author, type}) {
  return (
    <span className={classNames(Styles[type], Styles.initials)}>
      {author.firstName[0].toUpperCase() + author.lastName[0].toUpperCase()}
    </span>
  );
}

export default Initials;
