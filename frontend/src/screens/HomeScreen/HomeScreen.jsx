import React from "react";
import Hero from "../../components/Hero/Hero";
import FeaturedArticles from "../../components/FeaturedArticles/FeaturedArticles";
import classNames from "classnames";

const HomeScreen = () => {
  return (
    <>
      <Hero />
      <div className={classNames("mainContentContainer space-top-9 container")}>
        <FeaturedArticles />
      </div>
    </>
  );
};

export default HomeScreen;
