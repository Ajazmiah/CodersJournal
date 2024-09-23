import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "../../components/Atoms/Button/Button";
import useUploadImage from "../../hooks/useUploadImage";
import { toast } from "react-toastify";
import ProfileImage from "../../components/ProfileImage/ProfileImage";


function UpdateAccountScreen() {
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // CUSTOM USEHOOK
  const [previewImage, image, INPUT] = useUploadImage();

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
      const form = new FormData();

      form.append("profilePicture", image);
      form.append("firstName", firstName);
      form.append("lastName", lastName);
      form.append("email", email);
      form.append("password", password);
      form.append("confirmPassword", confirmPassword);
      form.append("_id", userInfo._id);
      try {
        const res = await updateProfile(form).unwrap();
        dispatch(setCredentials(res));
        toast.success("Your profile is updated");
        if (res) navigate("/profile");
      } catch (err) {
        toast.error(err.data.message);
        console.log("ERR", err);
      }
    }
  };
  return (
    <div>
      <Container>
        <ProfileImage
          imageURL={previewImage || userInfo.profilePicture}
          customClasses="profileImage"
        />
        <form onSubmit={submitHandler}>
          <div>{INPUT}</div>
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
          <Button type='submit'>
            Update
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default UpdateAccountScreen;
