import React from "react";
import { Link } from "react-router-dom";
import Styles from "./DropDownMenu.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { icons, getIcon } from "../Icon/index.jsx";
import classNames from "classnames";
import Border from "../Atoms/Border/Border.jsx";

function DropDownMenu({
  Styles,
  dropDownItems,
  handleClick,
  showMenu,
  handleShow = null,
}) {
  if (!showMenu) return;

  return dropDownItems.map(({ Element, text, to }) => (
    <>
      <li className={classNames(Styles?.listItem, "flex")} key={text}>
        {Element ? (
          <button onClick={handleClick}>
            <span className={Styles.listItemContent}>
              {text}
              <FaSignOutAlt />
            </span>
          </button>
        ) : (
          <Link onClick={handleShow} to={to}>
            <span className={Styles.listItemContent}>
              {text}
              {getIcon(text.split(" ").join(""))}
            </span>
          </Link>
        )}
      </li>
    </>
  ));
}

export default DropDownMenu;
