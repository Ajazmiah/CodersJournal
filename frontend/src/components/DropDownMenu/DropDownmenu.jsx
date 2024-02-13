import React from "react";
import { Link } from "react-router-dom";
import Styles from "./DropDownMenu.module.css";
import { Button } from "@mui/material";

function DropDownMenu({ dropDownItems, handleClick }) {
  return dropDownItems.map(({ Element, text, to }) =>
    Element ? (
      <li className={Styles.listItem}>
        <Button sx={{ margin: 0, padding: 0, color: '#ff8c57' }} key={text} onClick={handleClick}>
          {text}
        </Button>
      </li>
    ) : (
      <li className={Styles.listItem}>
        <Link to={to} key={to}>
          {text}
        </Link>
      </li>
    )
  );
}

export default DropDownMenu;
