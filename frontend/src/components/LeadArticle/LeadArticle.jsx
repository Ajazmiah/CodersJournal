import React from "react";
import Typography from "@mui/material/Typography";
import Styles from "./LeadArticle.module.css";
import Image from "../Image/Image";
import classNames from "classnames";
import { useLink } from "../../hooks/useLInk/useLink";
import { formatDate } from "../../utils";
import AuthorBylineCard from "../AuthorBylineCard/AuthorBylineCard";

const LeadArticle = ({ post }) => {
  const { handleNavigateToPost } = useLink();

  return (
    <div onClick={() => handleNavigateToPost(post)} className={Styles.lead}>
      <img
        src={post.coverImage}
        loading="eager"
        className={classNames("imageRound", Styles.leadImage)}
      />
      <div className={Styles.postDetails}>
        <AuthorBylineCard author={post?.author || post?.authorId} />

        <h1 className={classNames("heading heading-2 ")}>{post.title}</h1>
        <span variant="subtitle2">{post.summary}</span>
        <span>{formatDate(post?.createdAt)}</span>
      </div>
    </div>
  );
};

export default LeadArticle;
