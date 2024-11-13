import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import {
  useForgotPasswordMutation,
  useConfirmResetPasswordTokenMutation,
} from "../../slices/usersApiSlice";
import { useNavigate, useLocation } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [reset] = useForgotPasswordMutation();

  //Token
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [confirmToken] = useConfirmResetPasswordTokenMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await reset({ email }).unwrap();
      console.log("Response:", res); // Log the entire response

      toast.success("email sent");
    } catch (err) {
      console.log("Error:", err); // Log the error if it occurs
      toast.error(err.data.message);
    }
  };

  useEffect(() => {
    const confirmTokenMatch = async () => {
      try {
        const res = await confirmToken({ token }).unwrap();
        console.log("___RES___", res);
        navigate("/reset-password?token="+token);
      } catch (err) {
        toast.error(err.data.message);
      }
    };

    if (token) confirmTokenMatch();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h6" variant="h7">
          Enter your email to receive a password reset link if an account
          exists.
        </Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Email
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
