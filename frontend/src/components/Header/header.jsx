import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice.js";
import { logout } from "../../slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import Styles from "./Header.module.css";
import DropDownMenu from "../DropDownMenu/DropDownmenu.jsx";
import ProfileImage from "../ProfileImage/ProfileImage.jsx";
import Logo from "../Logo/Logo.jsx";
import { backdropContext } from "../../context/backdropContext.jsx";
import useNavigationItem from "../../hooks/useNavigationItem.jsx";
import VerticalModal from "../VerticalModal/verticalModal.jsx";
import Backdrop from "../Backdrop/Backdrop.jsx";
import classNames from "classnames";
import { FaHamburger, FaSignOutAlt, FaBars } from "react-icons/fa";
import { icons, getIcon } from "../Icon/index.jsx";
import useScreenSize from "../../hooks/useScreenSize.jsx";
import HeaderMobileNav from "./HeaderMobileNav.jsx";
import ResponsiveComponent from "../ResponsiveComponent/ResponsiveComponent.jsx";
import { styled } from "@mui/material";

/*==============================================================*/
function ResponsiveAppBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userSettingMenu, pagesNavigation, userInfo, loggedInMobileMenu] =
    useNavigationItem();
  const [isBackdropOpen, setOpenBackdrop] = useContext(backdropContext);
  const [openNav, setOpenNav] = useState(false);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      alert("ERROR-Logging out");
    }
  };

  const device = useScreenSize();
  console.log("DEVICE", device);

  useEffect(() => {
    setOpenBackdrop(openNav);
  }, [openNav]);

  return (
    <header className={classNames(Styles.header)}>
      {/* Left Menu Medium to Large screen */}
      <nav className={classNames(Styles.nav, "flex merriweather-regular")}>
        {/* LOGO */}
        <div className={Styles.logo}>
          <Logo />
        </div>
        <ResponsiveComponent renderOn={["tablet", "desktop", "large"]}>
          <>
            <div className={classNames(Styles.navLeft, "flex")}>
              {device !== "mobile" && device !== "tablet" && (
                <ul className={classNames(Styles.leftMenuList, "flex")}>
                  {pagesNavigation.map((page) => (
                    <li key={page.to}>
                      <Link to={page.to} className={Styles.navLink}>
                        {page.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        </ResponsiveComponent>

        <ResponsiveComponent renderOn={["desktop", "large"]}>
          {/* USER SETTING MENU */}
          {userInfo ? (
            <div className={classNames(Styles.navRight, "flex")}>
              <button
                className={Styles.profileButton}
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <ProfileImage
                  customClasses="headerImage"
                  imageURL={userInfo?.profilePicture || false}
                />
              </button>
              {showMenu && (
                <div className={Styles.userMenu}>
                  <ul onClick={() => setShowMenu((prev) => !prev)}>
                    <DropDownMenu
                      dropDownItems={userSettingMenu}
                      Styles={Styles}
                      handleClick={logoutHandler}
                      showMenu={showMenu}
                    />
                  </ul>
                </div>
              )}
            </div>
          ) : null}
        </ResponsiveComponent>

        <ResponsiveComponent renderOn={["tablet", "mobile"]}>
          <div className={Styles.navRight}>
            <FaBars onClick={() => setShowMenu((prev) => !prev)} />
          </div>
          {showMenu ? <Backdrop>
            <VerticalModal>
              <DropDownMenu
                dropDownItems={[...pagesNavigation , ...userSettingMenu ]}
                showMenu={showMenu}
                handleClick={logoutHandler}
                handleShow={() => setShowMenu(false)}
              />
            </VerticalModal>
          </Backdrop> : null}
        </ResponsiveComponent>
      </nav>
    </header>
  );
}
export default ResponsiveAppBar;
