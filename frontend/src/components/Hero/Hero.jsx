import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Styles from "./Hero.module.css";
import React, { useState } from "react";
import classNames from "classnames";
import heroImage from "../../../public/heroImage.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);


  if (userInfo) return;

  const content = (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          maxWidth: "960px",
          minWidth: "80%",
          paddingTop: "100px",
          margin: "0 auto",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={7} sm={12} lg={5}>
          <div className={Styles.phraseContent}>
            <div className={classNames(Styles.phrase, "space-bottom-1")}>
              <p className={Styles.phrasePrimary}>Craft.Connect.Captivate</p>
              <p className={Styles.phraseSecondary}>
                Write To The World & Inspire with Inkspire
              </p>
            </div>
            <Link to="/signup" className={Styles.getStarted}>
              Get Started
            </Link>
          </div>
        </Grid>

       

        <Grid item xs={5} sm={12} lg={5} className={Styles.item}>
          <Container>
            {/* <Paper elevation={8} sx={{ maxWidth: "450px" }}>
              {login ? <LoginForm /> : <RegisterForm />}
            </Paper> */}
            <img src={heroImage} />
          </Container>
        </Grid>
      </Grid>
    </>
  );
  return <div className={Styles.hero}>{content}</div>;
};

export default Hero;
