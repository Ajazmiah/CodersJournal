import { Button, Paper } from "@mui/material";
import React from "react";
import Styles from "./EmailSignUp.module.css";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useConfirmEmailMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ConfirmationCode = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [verify] = useConfirmEmailMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode =
      verificationCode1 +
      verificationCode2 +
      verificationCode3 +
      verificationCode4 +
      verificationCode5;

    const id = userInfo._id;

    try {
      const res = await verify({ verificationCode, id }).unwrap();
      console.log("RES", res)
      dispatch(setCredentials({ ...res }));
      navigate("/profile");
      toast.success('Your email is verified')
    } catch (err) {
      toast.error(err.data.message)
    }
  };

  const [verificationCode1, setVerificationCode1] = useState("");
  const [verificationCode2, setVerificationCode2] = useState("");
  const [verificationCode3, setVerificationCode3] = useState("");
  const [verificationCode4, setVerificationCode4] = useState("");
  const [verificationCode5, setVerificationCode5] = useState("");

  return (
    <div className={Styles.confirmation}>
      <div className={Styles.codePrompt}>
        <h3>Verify Your Email</h3>
        <p>Enter the 5 digit code sent to</p>
        <p className={Styles.email}>{userInfo.email}</p>
      </div>
      <form>
        <input
          className={Styles.confirmationInput}
          value={verificationCode1}
          onChange={(e) => setVerificationCode1(e.target.value)}
          maxlength="1"
        />
        <input
          className={Styles.confirmationInput}
          value={verificationCode2}
          onChange={(e) => setVerificationCode2(e.target.value)}
          maxlength="1"
        />
        <input
          className={Styles.confirmationInput}
          value={verificationCode3}
          onChange={(e) => setVerificationCode3(e.target.value)}
          maxlength="1"
        />
        <input
          className={Styles.confirmationInput}
          value={verificationCode4}
          onChange={(e) => setVerificationCode4(e.target.value)}
          maxlength="1"
        />
        <input
          className={Styles.confirmationInput}
          value={verificationCode5}
          onChange={(e) => setVerificationCode5(e.target.value)}
          maxlength="1"
        />
      </form>

      <Button
        sx={{
          backgroundColor: "#ffe262", //269c78 greeish
          color: "#000",
          width: "200px",
          marginTop: "1em",
        }}
        onClick={handleSubmit}
      >
        Verify
      </Button>
    </div>
  );
};

function Verification() {
  const [next, setNext] = useState(null);
  const [email, setEmail] = useState(null);

  const inputRef = useRef();

  console.log("EMAIL", email);

  const handleClick = () => {
    setEmail(inputRef.current.value);
  };

  return (
    <div className="Container">
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          width: "600px",
          textAlign: "center",
          margin: "0 auto",
          paddingBottom: "3em",
          borderRadius: "10px",
        }}
      >
        <ConfirmationCode />
      </Paper>
    </div>
  );
}

export default Verification;
