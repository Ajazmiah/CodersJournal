import React from "react";
import Header from "./components/Header/header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/SideBar/SideBar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />

      <main className="main">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default App;
