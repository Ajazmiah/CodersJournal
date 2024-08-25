import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
 
  return (
    <>
      <Header />
      <ToastContainer />
      <div className=""> 
        <Outlet/>
      </div>
    </>
  );
}

export default App;
