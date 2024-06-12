import React from "react";
import { Link } from "react-router-dom";
import Styles from "./DropDownMenu.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { icons, getIcon } from "../Icon/index.jsx";
import { Button } from "@mui/material";

function DropDownMenu({ dropDownItems, handleClick }) {
  return dropDownItems.map(({ Element, text, to }) => (
    <li className={classNames(Styles.listItem, "flex")} key={text}>
      {Element ? (
        <>
          <button
            sx={{ margin: 0, padding: 0, color: "#ffff" }}
            onClick={logoutHandler}
          >
            {text}
          </button>
          <FaSignOutAlt />
        </>
      ) : (
        <>
          <Link to={to}>{text}</Link>
          {getIcon(text.split(" ").join(""))}
        </>
      )}
    </li>
  ));
}

export default DropDownMenu;
