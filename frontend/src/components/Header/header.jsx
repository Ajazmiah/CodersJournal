// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
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

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./HeaderMuiTheme.js";

/*==============================================================*/

const loggedInNav = [
  {
    to: "/profile",
    text: "Profile",
  },
  {
    to: "profile/update",
    text: "Edit Account",
  },

  {
    text: "Home",
    to: "/",
  },
  {
    to: "/create",
    text: "Create",
  },
  {
    text: "Logout",
    Element: "Button",
  },
];

const loggedInDropDown = loggedInNav.filter((item) => {
  if (
    item.text === "Logout" ||
    item.text === "Profile" ||
    item.text === "Edit Account"
  )
    return item;
});

const loggedOutDropDown = [
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
];


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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
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
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Only shows on and after Mobile size*/}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
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
              </Menu>
            </Box>

            {/*LOGO*/}
            <Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex" },
                  flexGrow: 1,
                  margin: {xs: 'auto'},
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#000",
                  textDecoration: "none",
                }}
              >
                <Link className={Styles.logo} to="/">
                  INKSPIRE
                </Link>
              </Typography>
            </Box>
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
