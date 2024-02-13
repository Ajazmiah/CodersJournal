import React from "react";
import Header from "./components/Header/header";
import { Outlet } from "react-router-dom";
import "./styles/globalCSS.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
 
  return (
    <>
      <Header />
      <ToastContainer />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
