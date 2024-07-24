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
      className={classNames(Styles.featuredCard, Styles.card)}
    >
      <div>
        <div>
          <h1 className={classNames(Styles.featuredTitle)}>{post.title}</h1>
          <p className={Styles.summary}>
            {post.summary ? post.summary : "Summary is not available"}
          </p>
          <span>{formatDate(post?.createdAt)}</span>
        </div>
      </div>

      <div className={Styles.FeaturedImage}>
        <img
          src={post?.coverImage}
          alt={post?.alt || "cover photo of the post"}
          loading="eager"
        />
      </div>

      <AuthorBylineCard author={post?.author} />
    </div>
  );
}

export default FeaturedCard;
