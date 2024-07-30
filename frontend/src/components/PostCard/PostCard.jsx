import * as React from "react";
import { formatDate } from "../../utils";
import { useLink } from "../../hooks/useLink/useLink";
import AuthorBylineCard from "../AuthorBylineCard/AuthorBylineCard";
import Styles from "./PostCard.module.css";
import classNames from "classnames";
import Border from "../Atoms/Border/Border";
import { getIcon } from "../Icon";
import Date from "../Date/Date";

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

            <p className={classNames("heading-4 truncate", Styles.postTitle)}>
              {post?.title}
            </p>

            <div className={Styles.summary}>
              <p className="truncate">{post.summary}</p>
            </div>
            <div className={Styles.border}>
              <Border />
            </div>
            <div className={classNames(Styles.bottomPortion, "flex")}>
              <Date date={post?.createdAt} />
              <ul className={Styles.Icons}>
                <li>{getIcon("Comment")}</li>
                <li>{getIcon("Heart")}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default PostCard;
