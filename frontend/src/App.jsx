import React from "react";
import Header from "./components/Header/Header";
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

      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default App;
