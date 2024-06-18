import React from "react";
import { Link } from "react-router-dom";
import Styles from './HeaderMobileNav.module.css'
import classNames from "classnames";
import Border from "../Atoms/Border/Border";
import { FaHome } from "react-icons/fa";
import { getIcon } from "../Icon";

function HeaderMobileNav({
  dropDownItems,
  handleClick,
  handleShow = null,
}) {
  return (
    <ul className={Styles.mobileList}>
      {dropDownItems.map(({ Element, text, to } , index , el) => (
        <>
        <li className={classNames(Styles.listItem, "flex merriweather-regular")} key={text}>
          {Element ? (
            <button onClick={handleClick}>{text}</button>
          ) : (
            <>
            
            <Link onClick={handleShow} to={to}>
              {text}
            </Link>
            {getIcon(text.split(" ").join(""))}

            </>
          )}
        </li>
       {index < dropDownItems.length -1 ?  <Border/> : null}
        </>
      ))}
    </ul>
  );
}

export default HeaderMobileNav;
