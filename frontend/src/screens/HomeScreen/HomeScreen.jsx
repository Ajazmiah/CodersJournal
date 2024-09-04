import React from "react";
import Hero from "../../components/Hero/Hero";
import FeaturedArticles from "../../components/FeaturedArticles/FeaturedArticles";
import classNames from "classnames";
import Sidebar from "../../components/SideBar/SideBar";
import Styles from './HomeScreen.module.css'

const HomeScreen = () => {
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
