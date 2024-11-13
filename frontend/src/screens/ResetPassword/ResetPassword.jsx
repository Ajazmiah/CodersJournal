import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";

import { useResetPasswordMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

function ResetPassword() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const [reset] = useResetPasswordMutation();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      if (password !== confirmPassword) {
        alert("Password don't match");
      } else {
        const data = {
          token,
          password,
          confirmPassword,
        };

        try {
          const res = await reset(data).unwrap();
          navigate("/login");
          toast.success("Sign in with your new password");
        } catch (err) {
          toast.error(err.data.message);
        }
      }
    }
  };

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        try {
          const response = await fetch(
            "/api/users/confirm-reset-password-token",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token, id }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            dispatch(setCredentials({ ...data }));
            toast.success("reset your password");
          } else {
            toast.error("Verification failed. Please request a new link.");
          }
        } catch (error) {
          console.log("Verification error:", error);
          alert("An error occurred. Please try again.");
        }
      }
    };

    verifyEmail();
  }, []);

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ paddingTop: "var(--space-78)" }}
    >
      <h1 className="header4">Reset password</h1>
      <br />
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="mt-3"
        >
          Reset
        </Button>
      </form>
    </Container>
  );
}

export default ResetPassword;
