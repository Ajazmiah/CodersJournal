import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import useUploadImage from "../../hooks/useUploadImage";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";
import UploadFileButton from "../UploadButton/UploadFileButton";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [previewImage, image, INPUT] = useUploadImage();

  const [signup, { isLoading }] = useSignupMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInputs = () => {
    const inputs = [firstName, lastName, email, password, confirmPassword];

    let errors = "";

    inputs.forEach((input) => {
      if (input === "" || input === null) {
        errors = `everything must be filled\n`;
      }
    });

    if (errors.length > 0) {
      toast.error(errors);
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      if (password !== confirmPassword) {
        alert("Password don't match");
      } else {
        const form = new FormData();

        // form.append("profilePicture", image);
        // form.append("firstName", firstName);
        // form.append("lastName", lastName);
        // form.append("email", email);
        // form.append("password", password);
        // form.append("confirmPassword", confirmPassword);

        const data = {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        };

        try {
          const res = await signup(data).unwrap();
          dispatch(setCredentials({ ...res }));

          navigate("/");
        } catch (err) {
          toast.error(err.data.message);
        }
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const PROFILE_IMAGE = (
    <ProfileImage
      imageURL={previewImage || image}
      empty={!image && !previewImage}
      customClasses="profileImage"
    />
  );

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ paddingTop: "var(--space-78)" }}
    >
      <h1 className="header4">Register</h1>
      <br />

      <br />
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12} spacing={2}>
            {/* {INPUT} */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
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
          disabled={isLoading}
        >
          Register
        </Button>
      </form>
      <div className="py-3">
        <Typography>
          Already have an account?{" "}
          <Link component={RouterLink} to="/signin">
            Login
          </Link>
        </Typography>
      </div>
    </Container>
  );
};

export default RegisterForm;
