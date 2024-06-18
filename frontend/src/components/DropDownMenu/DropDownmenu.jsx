import React from "react";
import { Link } from "react-router-dom";
import Styles from "./DropDownMenu.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { icons, getIcon } from "../Icon/index.jsx";
import classNames from "classnames";

function DropDownMenu({
  Styles,
  dropDownItems,
  handleClick,
  showMenu,
  handleShow = null,
}) {
  

  if (!showMenu) return;
  return dropDownItems.map(({ Element, text, to }) => (
    <li className={classNames(Styles?.listItem, "flex")} key={text}>
      {Element ? (
        <>
          <button onClick={handleClick}>{text}</button>
          <FaSignOutAlt />
        </>
      ) : (
        <>
          <Link onClick={handleShow} to={to}>
            {text}
          </Link>
          {getIcon(text.split(" ").join(""))}
        </>
      )}
    </li>
  ));
}

export default DropDownMenu;
