import { useSelector } from "react-redux";

import { Container } from "@mui/material";
import Styles from "./Hero.module.css";
import React, { useState } from "react";
import classNames from "classnames";
import heroImage from "../../../public/heroImage.jpg";
import { Link } from "react-router-dom";
import Image from "../Image/Image";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);


  if (userInfo) return;

  const content = (
    <>
      <div>
        <div>
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
        </div>

       <div  className={Styles.item}>
          <Container>
            <Image/>
           </Container>
        </div>
      </div>
    </>
  );
  return <div className={Styles.hero}>{content}</div>;
};

export default Hero;
