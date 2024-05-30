import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice.js";
import { logout } from "../../slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import Styles from "./Header.module.css";
import DropDownMenu from "../DropDownMenu/DropDownmenu.jsx";
import ProfileImage from "../ProfileImage/ProfileImage.jsx";

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

  const [openNav , setOpenNav] = useState(false)

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


  React.useEffect(() => {

setOpenBackdrop(openNav)

  }, [openNav])



  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            {/* Only shows on and after Mobile size*/}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setOpenNav((prev) => !prev)}
                aria-label="close"
              >
                <MenuIcon />
              </IconButton>

              {openNav ? (
                <Backdrop>
                  <VerticalModal classes={Styles} pagesNavigation={pagesNavigation} />
                </Backdrop>
              ) : null}
            </Box>

            {/*LOGO*/}
            <Logo />
            {/*- Left Menu Medium to Large screen */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pagesNavigation.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={page.to} className={Styles.navLink}>
                    {page.text}
                  </Link>
                </MenuItem>
              ))}
            </Box>

            {/*USER SETTING MENU*/}
            {userInfo ? (
              <Box sx={{ flexGrow: 0 }}>
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
                  {userInfo?._id && (
                    <DropDownMenu dropDownItems={userSettingMenu} handleClick={logoutHandler} />
                  )}
                </Menu>
              </Box>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
