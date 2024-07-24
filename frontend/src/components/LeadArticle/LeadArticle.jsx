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
      <div>
        <AuthorBylineCard author={post?.author} />

        <span>{post.title}</span>
        <span variant="subtitle2">{post.summary}</span>
        <span>{formatDate(post?.createdAt)}</span>
      </div>
    </div>
  );
};

export default LeadArticle;
