import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useSelector } from "react-redux";
import Styles from "./AuthorBylineCard.module.css";
import classNames from "classnames";
import { useLink } from "@hooks/useLink/useLink";
import { redirect } from "react-router-dom";

function AuthorBylineCard({ author }) {
  const { userInfo } = useSelector((state) => state.auth);

  const { handleNavigateToPost } = useLink();

  const authorName = `${author?.firstName} ${author?.lastName}`;
  const profilePicture = author?.profilePicture;

  const handleClick = (event) => {
    let path = `/author/${authorName}-${author?._id}`;

    if (userInfo?._id === author?._id) {
      path = "/profile";
    }
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
          <p className={Styles.author}>{authorName}</p>
        </div>
      </div>
    )
  );
}

export default AuthorBylineCard;
