import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Verification from "./EmailSignUp/Verification";

import React from "react";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/signin" replace />;
  }

  if (!userInfo.isVerified) {
    return <Verification email={userInfo.email} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
