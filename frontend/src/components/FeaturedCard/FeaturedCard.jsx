import React from "react";
import Styles from "./FeaturedCard.module.css";
import classNames from "classnames";
import { useLink } from "../../hooks/useLInk/useLink";
import Image from "../Image/Image";
import { formatDate } from "../../utils";
import AuthorBylineCard from "../AuthorBylineCard/AuthorBylineCard";
import Date from "../Date/Date";


function FeaturedCard({ post }) {
  const { handleNavigateToPost } = useLink();

  return (
    <div
      onClick={() => handleNavigateToPost(post)}
      className={classNames(Styles.featuredCard, "flex")}
    >
      <div className={Styles.coverImage}>
        <img
          src={post?.coverImage}
          alt={post?.alt || "cover photo of the post"}
          loading="eager"
        />
      </div>
      <div className={Styles.postDetails}>
        <h1 className={classNames(Styles.featuredTitle, 'truncate')}>{post.title}</h1>
        <p className={ classNames(Styles.summary, 'truncate')}>
          {post.summary ? post.summary : "Summary is not available"}
        </p>
      </div>
      <Date date={post.createdAt}/>   
    </div>
  );
}

export default FeaturedCard;
