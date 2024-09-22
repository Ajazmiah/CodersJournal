import React from "react";
import { Link } from "react-router-dom";
import Styles from "./HeaderMobileNav.module.css";
import classNames from "classnames";
import Border from "../Atoms/Border/Border";
import { FaSignInAlt } from "react-icons/fa";
import { getIcon } from "../Icon";


const renderListItem = ({ Element, handleClick, text, to }) => {
  return Element ? (
    <button onClick={handleClick}>{text}</button>
  ) : (
    <Link to={to} className="flex">
      {text}
      <span> {getIcon(text.split(" ").join(""))}</span>
    </Link>
  )
};




function HeaderMobileNav({ dropDownItems, handleClick, handleShow }) {
  return (
    <ul className={Styles.mobileList}>
      {dropDownItems.map(({ Element, text, to }, index, el) => (
        <>
          <li
            className={classNames(Styles.listItem, "merriweather-regular")}
            onClick={handleShow}
            key={text}
          >
            {renderListItem({ Element, handleClick, text, to })}
          </li>
          {index < dropDownItems.length - 1 ? <Border /> : null}
        </>
      ))}
    </ul>
  );
}

export default HeaderMobileNav;
