import React from "react";
import Hero from "../../components/Hero/Hero";
import FeaturedArticles from "../../components/FeaturedArticles/FeaturedArticles";
import classNames from "classnames";
import Sidebar from "../../components/SideBar/SideBar";
import Styles from "./HomeScreen.module.css";
import Button from "../../components/Atoms/Button/Button";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo && !userInfo?.isVerified) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <>
      <Hero />
      <div className={classNames(" main-2-column space-top-9 Container")}>
        <div className={Styles.featuredArticles}>
          <FeaturedArticles />
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default HomeScreen;
