import React from "react";
import Styles from "./FeaturedCard.module.css";
import classNames from "classnames";
import { useLink } from "../../hooks/useLInk/useLink";
import Image from "../Image/Image";
import { formatDate } from "../../utils";
import AuthorBylineCard from "../AuthorBylineCard/AuthorBylineCard";

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
       <div className={Styles.postInfo}>
       <AuthorBylineCard author={post?.author || post?.authorId} />
        <p className="createdAt">{formatDate(post?.createdAt)}</p>
       </div>
        <h1 className={classNames(Styles.featuredTitle)}>{post.title}</h1>
        <p className={Styles.summary}>
          {post.summary ? post.summary : "Summary is not available"}
        </p>
      </div>
    </div>
  );
}

export default FeaturedCard;
