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
import Logo from "../Logo/Logo.jsx";
import Backdrop from '../Backdrop/Backdrop.jsx'
import { backdropContext } from "../../context/backdropContext.jsx";
import Styles from './VerticalModal.module.css'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});





export default function VerticalModal({
  pagesNavigation,
  classes,
}) {

  const [isBackdropOpen, setOpenBackdrop] = React.useContext(backdropContext)

  return (
    <React.Fragment>

 
          <div className={Styles.navModal} onClick={(e) => console.log("BACKSROP", isBackdropOpen)}>
            <ul>
            {pagesNavigation.map((page) => (
                <MenuItem key={page}>
                  <Link
                    to={page.to}
                    className={classes.navLink}
                  >
                    {page.text}
                  </Link>
                </MenuItem>

              ))}
            </ul>
          </div>
       
    </React.Fragment>
  );
}
