import React from "react";
import Header from "./components/Header/header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/SideBar/SideBar";
import Footer from "./components/Footer/Footer";
import ToggleColorMode from "./components/ToggleColorMode/ToggleColorMode";
import toggleStyle from "./components/ToggleColorMode/ToggleColorMode.module.css";
import CssBaseline from '@mui/material/CssBaseline';
import { colors } from "@mui/material";


function App() {
  return (
    <>
      <ToggleColorMode>
        <CssBaseline />
        <Header />
        <ToastContainer />

        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </ToggleColorMode>
    </>
  );
}

export default App;
