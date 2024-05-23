// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import Styles from "./Header.module.css";
import DropDownMenu from "../DropDownMenu/DropDownmenu.jsx";
import ProfileImage from "../ProfileImage/ProfileImage.jsx";

import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";


import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./HeaderMuiTheme.js";
import Logo from "../Logo/Logo.jsx";
import FullScreenDialog from "../FullScreenModal/FullScreenModal.jsx";


/*==============================================================*/
const pageLoggedInNavMenu = [
  {
    text: "Home",
    to: "/",
  },
  {
    to: "/create",
    text: "Create",
  }
]

const pageLoggedOutNavMenu = [
  {
    text: "Home",
    to: "/",
  },
  {
    text: "Sign In",
    to: "/signin",
  },
  {
    text: "Sign Up",
    to: "/signup",
  },
]

const userSettingMenu = [
  {
    to: "/profile",
    text: "Profile",
  },
  {
    to: "profile/update",
    text: "Edit Account",
  },
  {
    text: "Logout",
    Element: "Button",
  },
]


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);


  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state?.auth?.userInfo);
  const pagesNavigation = userInfo?._id ? pageLoggedInNavMenu : pageLoggedOutNavMenu


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

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            {/* Only shows on and after Mobile size*/}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <FullScreenDialog Styles={Styles} pagesNavigation={pagesNavigation} handleCloseNavMenu={handleCloseNavMenu} anchorElNav={anchorElNav}/>
            </Box>

            {/*LOGO*/}
            <Logo/>
            {/*- Left Menu Medium to Large screen */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pagesNavigation.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.to}
                    className={Styles.navLink}
                  >
                    {page.text}
                  </Link>
                </MenuItem>

              ))}
            </Box>

            {/*USER SETTING MENU*/}
            {userInfo ? <Box sx={{ flexGrow: 0, }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <ProfileImage
                    customClasses="headerImage"
                    imageURL={userInfo?.profilePicture || false}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClick={handleCloseUserMenu}
              >
                {!userInfo?._id && (
                  <DropDownMenu dropDownItems={userSettingMenu} />
                )}
                {userInfo?._id && (
                  <DropDownMenu
                    dropDownItems={userSettingMenu}
                    handleClick={logoutHandler}
                  />
                )}
              </Menu>
            </Box>
              : null}
          </Toolbar>
        </Container>
      </AppBar>

    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
