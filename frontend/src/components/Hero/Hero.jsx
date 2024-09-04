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
    
      <div className={"Container"}>
        <p>
          <span className={classNames('heading-1', Styles.mainTagLine)}>
            Spread The Knowledge of Coding
          </span>
          <br/>
          <span className={classNames('heading-4', Styles.subTagLine)}>Learn. Share. Inspire.</span>
        </p>

        <div className={Styles.btns}>
          <a href='#leadArticle'className={classNames(Styles.btn, Styles.btnNonTransparent)}>
            Read
          </a>
          <Link to='/create' className={classNames(Styles.btn, Styles.btnTransparent)}>
            Start Writing
          </Link>
        </div>
      </div>

  );
  return <div className={Styles.hero}>{content}</div>;
};

export default Hero;
