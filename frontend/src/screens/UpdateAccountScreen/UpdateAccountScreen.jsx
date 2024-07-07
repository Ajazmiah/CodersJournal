import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useUploadImage from "../../hooks/useUploadImage";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import ProfileImage from "../../components/ProfileImage/ProfileImage";

import Input from '@mui/material/Input';
function UpdateAccountScreen() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [profilePicture , setProfilePicture] = useState(null)

  // CUSTOM USEHOOK
  const [handleImageUpload, image] = useUploadImage();

  const handleFileChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    const img = await handleImageUpload(file);
    if(img ) {
      setProfilePicture(img)
    }

  };

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.firstName, userInfo.lastName]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          firstName,
          lastName,
          email,
          profilePicture: image.myFile,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Your profile is updated");
        if (res) navigate("/profile");
      } catch (err) {
        console.log("ERR", err);
      }
    }
  };
//   let PROFILE_PICTURE = userInfo?.profilePicture

// useEffect(() => {
//   if(image) {
//     PROFILE_PICTURE = image
//   }

// }, image)

  return (
    <div>
      <Container>
      <ProfileImage
          imageURL={profilePicture || userInfo?.profilePicture}
          customClasses="profileImage"
        />
        <form onSubmit={submitHandler}>
          <div>
            <Input
              accept="image/*" // Accept only image files, modify as needed
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span">
                Upload File
              </Button>
            </label>
          </div>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            Update
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default UpdateAccountScreen;
