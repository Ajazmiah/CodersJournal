import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/material";
import Logo from "../Logo/Logo";
import Backdrop from '../Backdrop/Backdrop.jsx'
import { modalContext } from "../../context/modalContext.jsx";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});





export default function FullScreenDialog({
  pagesNavigation,
  Styles,
}) {
  const [open, setOpen] = React.useState(false);
  const [isModalOpen, setOpenModal] = React.useContext(modalContext)



  const handleClick = () => setOpenModal(prev => !prev)
  
  return (
    <React.Fragment>
     

      <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClick}
              aria-label="close"
            >
               <MenuIcon />
            </IconButton>
          </Toolbar>

         {isModalOpen ?  <Backdrop>
          {pagesNavigation.map((page) => (
                <MenuItem key={page}>
                  <Link
                    to={page.to}
                    className={Styles.navLink}
                  >
                    {page.text}
                  </Link>
                </MenuItem>

              ))}
          </Backdrop> : null}
    </React.Fragment>
  );
}
