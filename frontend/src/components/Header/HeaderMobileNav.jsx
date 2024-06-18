import React from "react";
import { Link } from "react-router-dom";
import Styles from './HeaderMobileNav.module.css'
import classNames from "classnames";
import Border from "../Atoms/Border/Border";

function HeaderMobileNav({
  dropDownItems,
  handleClick,
  handleShow = null,
}) {
  return (
    <ul className={Styles.mobileList}>
      {dropDownItems.map(({ Element, text, to }) => (
        <>
        <li className={classNames(Styles.listItem, "flex merriweather-regular")} key={text}>
          {Element ? (
            <button onClick={handleClick}>{text}</button>
          ) : (
            <Link onClick={handleShow} to={to}>
              {text}
            </Link>
          )}
        </li>
        <Border/>
        </>
      ))}
    </ul>
  );
}

export default HeaderMobileNav;
