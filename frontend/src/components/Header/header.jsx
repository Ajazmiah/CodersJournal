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
/*==============================================================*/
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userSettingMenu, pagesNavigation, userInfo] = useNavigationItem();
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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    setOpenBackdrop(openNav);
  }, [openNav]);

  return (
    <header className={classNames(Styles.header)}>
      {/* Only shows on and after Mobile size */}
      {/* <div className={Styles.mobileMenu}>
            <button
              className={Styles.menuButton}
              onClick={() => setOpenNav((prev) => !prev)}
              aria-label="menu"
            >
              <span className={Styles.menuIcon}>☰</span>
            </button>

            {openNav ? (
              <Backdrop>
                <VerticalModal
                  classes={Styles}
                  pagesNavigation={pagesNavigation}
                />
              </Backdrop>
            ) : null}
          </div> */}

      {/* Left Menu Medium to Large screen */}
      <nav className={classNames(Styles.nav, 'flex merriweather-regular')}>
        {/* LOGO */}
        <div className={classNames(Styles.navLeft, 'flex')}>
          <div className={Styles.logo}>
            <Logo />
          </div>
          <ul className={classNames(Styles.leftMenuList, 'flex')}>
            {pagesNavigation.map((page) => (
              <li key={page.to}>
                <Link
                  to={page.to}
                  className={Styles.navLink}
                  onClick={handleCloseNavMenu}
                >
                  {page.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* USER SETTING MENU */}
        {userInfo ? (
          <div className={classNames(Styles.navRight, 'flex')}>
            <button
              className={Styles.profileButton}
              onClick={handleOpenUserMenu}
            >
              <ProfileImage
                customClasses="headerImage"
                imageURL={userInfo?.profilePicture || false}
              />
            </button>
            <div className={Styles.userMenu}>
              <ul>
                {userInfo?._id &&
                  userSettingMenu.map(({ Element, text, to }) => (
                    <li className={Styles.listItem} key={text}>
                      {Element ? (
                        <button
                          sx={{ margin: 0, padding: 0, color: "#ffff" }}
                          onClick={logoutHandler}
                        >
                          {text}
                        </button>
                      ) : (
                        <Link to={to}>{text}</Link>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
export default ResponsiveAppBar;
