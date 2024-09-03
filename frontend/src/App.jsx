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
      <div className="mainContainer">
        <main>
          <Outlet />
        </main>
        <div>ADSS</div>
      </div>
    </>
  );
}

export default App;
