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

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const userInfo = useSelector((state) => state?.auth?.userInfo);

  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropDownItems = userInfo?._id ? loggedInDropDown : loggedOutDropDown;

  const loggedInNavigation = loggedInNav.filter(
    (item) => (item.text === "Home" || item.text === "Create") && item
  );

  const pages = userInfo?._id ? loggedInNavigation : ["Home"];

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
                {pages.map((page) => (
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
            <Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex" },
                  flexGrow: 1,
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
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ color: "#fff" }}
                  onClick={handleCloseNavMenu}
                >
                  <Link
                    to={page.to || "/"}
                   className={Styles.navLink}
                  >
                    {page.text}
                  </Link>
                </Button>
              ))}
            </Box>

            {userInfo ? <Box sx={{ flexGrow: 0, display: {md: 'none'} }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <ProfileImage
                    customClasses="headerImage"
                    imageURL={userInfo?.profilePicture || false}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px"}}
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
                onClose={handleCloseUserMenu}
              >
                {!userInfo?._id && (
                  <DropDownMenu dropDownItems={dropDownItems.filter(item => item.text !== 'Home')} />
                )}
                {userInfo?._id && (
                  <DropDownMenu
                    dropDownItems={dropDownItems}
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
