import { useSelector } from "react-redux";

import { Container } from "@mui/material";
import Styles from "./Hero.module.css";
import React, { useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import RegisterForm from "../RegisterForm/RegisterForm";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);


  if (userInfo) return;

  const content = (
   <div>
     <div className={Styles.leftSide}>
      <p>
        Where Your Stories Come to Life
        <span>Write, Share, Inspire.</span>
      </p>
      <button>Start Writing</button>
     </div>

     <div className={Styles.rightSide}>
      <RegisterForm/>

     </div>
   </div>
  );
  return <div className={Styles.hero}>{content}</div>;
};

export default Hero;
