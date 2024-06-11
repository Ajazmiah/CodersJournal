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

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setOpenBackdrop(openNav);
  }, [openNav]);

  return (
    <header className={Styles.header}>
      <div className={Styles.container}>
        <div className={Styles.toolbar}>
          {/* Only shows on and after Mobile size */}
          <div className={Styles.mobileMenu}>
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
          </div>

          {/* LOGO */}
          <Logo />

          {/* Left Menu Medium to Large screen */}
          <nav className={Styles.nav}>
            <ul>
              {pagesNavigation.map((page) => (
               <li  key={page.to}>
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

            {/* USER SETTING MENU */}
            {userInfo ? (
              <div className={Styles.userMenu}>
                <button
                  className={Styles.profileButton}
                  onClick={handleOpenUserMenu}
                >
                  <ProfileImage
                    customClasses="headerImage"
                    imageURL={userInfo?.profilePicture || false}
                  />
                </button>
                <div className={Styles.menu} id="menu-appbar">
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
        </div>
      </div>
    </header>
  );
}
export default ResponsiveAppBar;
