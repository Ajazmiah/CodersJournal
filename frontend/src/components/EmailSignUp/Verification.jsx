import { Button, Paper } from "@mui/material";
import React from "react";
import Styles from "./EmailSignUp.module.css";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useConfirmEmailMutation } from "../../slices/usersApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";

function VerifyEmailPage() {
  const location = useLocation();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const id = userInfo._id;

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  console.log("TOKEN", token);
  console.log("id", id);

  const [confirm] = useConfirmEmailMutation();

  useEffect(() => {
    const verifyEmail = async () => {
      if (token && id) {
        try {
          const response = await confirm({ token, id }).unwrap();

          navigate("/profile");
          toast.success("Your email is verified");
        } catch (error) {
          console.log("Verification error:", error);
          alert("An error occurred. Please try again.");
        }
      } else navigate("/");
    };

    verifyEmail();
  }, []);

  return <div>Check the email address you used to sign up and verify it</div>;
}

export default VerifyEmailPage;
