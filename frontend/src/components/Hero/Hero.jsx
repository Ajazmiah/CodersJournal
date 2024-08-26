import { useSelector } from "react-redux";

import { Container } from "@mui/material";
import Styles from "./Hero.module.css";
import React, { useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import Button from "../Atoms/Button/Button";


const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);


  if (userInfo) return;

  const content = (
   <div className={Styles.hero}>
     <div className={'container'}>
      <p className={Styles.tagLines}>
        <span className={Styles.mainTagLine}> Spread The Knowledge of Coding</span>
        <span className={Styles.subTagLine}>Learn. Share. Inspire.</span>
      </p>

      <Button classes={classNames(Styles.btn, Styles.btnNonTransparent)}>Read</Button>
      <Button lasses={classNames(Styles.btn, Styles.btnTransparent)}>Start Writing</Button>
     </div>
   </div>
  );
  return <div className={Styles.hero}>{content}</div>;
};

export default Hero;
