import {
  Backdrop,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ModalRectangular from "../Modal/ModalRectangular";
import { useBackdrop } from "../Backdrop/Backdrop";
import Styles from "./EmailSignUp.module.css";
import { useState, useRef } from "react";

const ConfirmationCode = () => {
  return (
    <div className={Styles.confirmation}>
      <form>
        <input className={Styles.confirmationInput} />
        <input className={Styles.confirmationInput} />
        <input className={Styles.confirmationInput} />
        <input className={Styles.confirmationInput} />
        <input className={Styles.confirmationInput} />
      </form>
    </div>
  );
};

function EmailSignUp() {
  const [next, setNext] = useState(null);
  const [email, setEmail] = useState(null);

  const emailRef = useRef();

  const handleClick = () => {
    if (email) setNext(true);
    else {
      alert("Enter Email");
      setNext(false);
    }
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
        {email ? (
          <ConfirmationCode />
        ) : (
          <>
            <p
              style={{
                fontSize: "1.2em",
                marginBlock: "2em",
              }}
            >
              Sign Up With Your Email
            </p>
            <form>
              <Grid container>
                <Grid item xs={12}>
                  <TextField fullWidth label="email" variant="outlined" ref={emailRef}/>
                  
                </Grid>
              </Grid>

              <Button
                sx={{
                  backgroundColor: "#ffe262",
                  color: "black",
                  width: "200px",
                  marginTop: "1em",
                }}
                onClick={handleClick}
              >
                Next
              </Button>
            </form>
          </>
        )}
      </Paper>
    </div>
  );
}

export default EmailSignUp;
