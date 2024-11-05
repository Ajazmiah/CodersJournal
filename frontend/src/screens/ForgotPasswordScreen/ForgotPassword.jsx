import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../../slices/usersApiSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [reset] = useForgotPasswordMutation();

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
