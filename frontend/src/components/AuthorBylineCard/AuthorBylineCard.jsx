import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useSelector } from "react-redux";
import Styles from "./AuthorBylineCard.module.css";
import classNames from "classnames";

import { useLink } from "../../hooks/useLInk/useLink";
function AuthorBylineCard({ author }) {
  const { userInfo } = useSelector((state) => state.auth);

  const { handleNavigateToPost } = useLink();

  const authorName = `${author?.firstName} ${author?.lastName}`;
  const profilePicture = author?.profilePicture;

  const handleClick = (event) => {
    console.log(author, "--------author");
    const path = `/author/${authorName}-${author?._id}`;
    event.stopPropagation();
    handleNavigateToPost("d", path);
  };

  return (
    author && (
      <div
        className={classNames(Styles.AuthorByline, "flex")}
        onClick={handleClick}
      >
        <div>
          <ProfileImage customClasses="ByLineImage" imageURL={profilePicture} />
        </div>
        <div>
          <p>
            {authorName}
            <span> {author?.bio ? author?.bio : " ,Writter"}</span>
          </p>
        </div>
      </div>
    )
  );
}

export default AuthorBylineCard;
