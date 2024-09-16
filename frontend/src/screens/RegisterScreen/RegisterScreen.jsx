import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterScreen = () => {
  return (
    <div className="Container">
      <RegisterForm className="container" />
    </div>
  );
};

export default RegisterScreen;
