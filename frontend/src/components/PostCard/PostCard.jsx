import * as React from "react";
import { formatDate } from "../../utils";
import { useLink } from "../../hooks/useLink/useLink";
import AuthorBylineCard from "../AuthorBylineCard/AuthorBylineCard";
import Styles from "./PostCard.module.css";
import classNames from "classnames";
import Border from "../Atoms/Border/Border";
import { getIcon } from "../Icon";

function PostCard({ posts }) {
  const { handleNavigateToPost } = useLink();

  return (
    posts &&
    posts.length > 0 && (
      <div className={Styles.posts}>
        {posts.map((post) => (
          <div
            key={post._id}
            className={Styles.post}
            onClick={() => handleNavigateToPost(post)}
          >
            <div className={classNames("space-bottom", Styles.postCoverImage)}>
              <img
                width={"100%"}
                height={"200px"}
                src={
                  post?.coverImage ||
                  "https://images.pexels.com/photos/159618/still-life-school-retro-ink-159618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
              />
            </div>

            <AuthorBylineCard author={post.authorId} />

            <p className={classNames("heading-4", Styles.postTitle)}>
              {post?.title}
            </p>

            <div className={Styles.postBottom}>
              <p>{post.summary}</p>
              <div className={Styles.border}>
                <Border />
              </div>
              <div className={""}>
                <span>{formatDate(post?.createdAt)}</span>
                <ul>
                  <li>{getIcon("Comment")}</li>
                  <li>{getIcon("Heart")}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default PostCard;
