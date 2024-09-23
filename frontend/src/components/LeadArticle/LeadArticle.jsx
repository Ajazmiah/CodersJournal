import React from "react";
import Typography from "@mui/material/Typography";
import Styles from "./LeadArticle.module.css";
import Image from "../Image/Image";
import classNames from "classnames";
import { useLink } from "@hooks/useLink/useLink";
import { formatDate } from "../../utils";
import AuthorBylineCard from "../AuthorBylineCard/AuthorBylineCard";
import Date from "../Date/Date";

const LeadArticle = ({ post }) => {
  const { handleNavigateToPost } = useLink();
  if(!post) return 
  

  return (
    <div
      onClick={() => handleNavigateToPost(post)}
      className={Styles.lead}
      id="leadArticle"
    >
      <img
        src={post.coverImageName || post.coverImage}
        loading="eager"
        className={classNames("imageRound", Styles.leadImage)}
      />
      <div className={Styles.details}>
        <div className={Styles.postDetails}>
          <h1 className={classNames("heading heading-2 truncate")}>
            {post.title}
          </h1>
          <span  className={classNames('truncate', Styles.summary)}>
            {post.summary}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeadArticle;
