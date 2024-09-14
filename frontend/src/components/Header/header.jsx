import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice.js";
import { logout } from "../../slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import Styles from "./Header.module.css";
import DropDownMenu from "../DropDownMenu/DropDownmenu.jsx";
import ProfileImage from "../ProfileImage/ProfileImage.jsx";
import Logo from "../Logo/Logo.jsx";
import useNavigationItem from "../../hooks/useNavigationItem.jsx";
import VerticalModal from "../VerticalModal/verticalModal.jsx";
import Backdrop from "../Backdrop/Backdrop.jsx";
import classNames from "classnames";
import { FaBars } from "react-icons/fa";
import useScreenSize from "../../hooks/useScreenSize.jsx";
import HeaderMobileNav from "./HeaderMobileNav.jsx";
import ResponsiveComponent from "../ResponsiveComponent/ResponsiveComponent.jsx";
import { useBackdrop } from "../Backdrop/Backdrop.jsx";

/*==============================================================*/
function ResponsiveAppBar() {
  const TOKEN_EXPIRY_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  const [showMenu, setShowMenu] = useState(false);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userSettingMenu, pagesNavigation, userInfo, loggedInMobileMenu] =
    useNavigationItem();

  const { backdrop, setBackdrop } = useBackdrop();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      alert("ERROR-Logging out");
    }
  };

  const timerRef = useRef(null);

  // useEffect(() => {
  //   if (!userInfo) {
  //     // If userInfo is not set, clear any existing timeout
  //     if (timerRef.current) {
  //       clearTimeout(timerRef.current);
  //       timerRef.current = null;
  //     }
  //     return;
  //   }

  //   // Set a new timeout if userInfo is available
  //   timerRef.current = setTimeout(() => {
  //     logoutHandler();
  //   }, TOKEN_EXPIRY_DURATION);

  //   // Cleanup function to clear the timeout if the component unmounts or userInfo is unset
  //   return () => {
  //     if (timerRef.current) {
  //       clearTimeout(timerRef.current);
  //       timerRef.current = null;
  //     }
  //   };
  // }, [userInfo]); // Only re-run if userInfo changes

  const device = useScreenSize();

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

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
                  imageURL={userInfo?.profilePicture}
                />
              </button>
              {showMenu && (
                <div className={Styles.userMenu}>
                  <ul>
                    <DropDownMenu
                      dropDownItems={userSettingMenu}
                      Styles={Styles}
                      handleClick={logoutHandler}
                      showMenu={showMenu}
                      handleShow={handleShowMenu}
                    />
                  </ul>
                </div>
              )}
            </div>
          ) : null}
        </ResponsiveComponent>

        <ResponsiveComponent renderOn={["tablet", "mobile"]}>
          <div className={Styles.navRight}>
            <FaBars onClick={() => setBackdrop((prev) => !prev)} />
          </div>
          {backdrop ? (
            <Backdrop handleBackdrop={() => setBackdrop(false)}>
              <VerticalModal>
                <HeaderMobileNav
                  dropDownItems={loggedInMobileMenu}
                  handleClick={logoutHandler}
                  handleShow={() => setBackdrop(false)}
                />
              </VerticalModal>
            </Backdrop>
          ) : null}
        </ResponsiveComponent>
      </nav>
    </header>
  );
}
export default ResponsiveAppBar;
