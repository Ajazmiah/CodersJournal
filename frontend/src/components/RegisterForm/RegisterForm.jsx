import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState({ myFile: "" });
  const fileInputRef = useRef(null);

  const clearFileName = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setProfilePicture({ myFile: "" });
    }
  };

  const [signup, { isLoading }] = useSignupMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password don't match");
    } else {
      try {
        const res = await signup({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          profilePicture: profilePicture.myFile,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        // fileInputRef.current.value = "";
        setProfilePicture("");
        navigate("/");
      } catch (err) {
        toast.error(err.data.message);
      }
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleProfilePic = async (e) => {
    const file = e.target.files[0];

    const base64Img = await convertToBase64(file);
    setProfilePicture(() => ({ myFile: base64Img }));
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ paddingTop: "var(--space-78)" }}
    >
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
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
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePic}
              ref={fileInputRef}
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