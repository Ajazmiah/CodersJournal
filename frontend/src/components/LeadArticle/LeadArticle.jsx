import React from "react";
import Typography from "@mui/material/Typography";
import Styles from "./LeadArticle.module.css";
import Image from "../Image/Image";
import classNames from "classnames";
import { useLink } from "../../hooks/useLInk/useLink";
import { formatDate } from "../../utils";
import AuthorBylineCard from "../AuthorBylineCard/AuthorBylineCard";
import Date from "../Date/Date";

const LeadArticle = ({ post }) => {
  const { handleNavigateToPost } = useLink();

  return (
    <div onClick={() => handleNavigateToPost(post)} className={Styles.lead}>
      <img
        src={post.coverImage}
        loading="eager"
        className={classNames("imageRound", Styles.leadImage)}
      />
      <div className={Styles.details}>
        <AuthorBylineCard author={post?.author || post?.authorId} />

        <div className={Styles.postDetails}>
          <h1 className={classNames("heading heading-2 truncate")}>{post.title}</h1>
          <span variant="subtitle2" className="truncate">{post.summary}</span>
          <Date date={post?.createdAt}/>
        </div>
      </div>
    </div>
  );
};

export default LeadArticle;
