import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useSelector } from "react-redux";
import Styles from "./AuthorBylineCard.module.css";
import classNames from "classnames";
function AuthorBylineCard({ author }) {
  const { userInfo } = useSelector((state) => state.auth);


  const authorName = `${author?.firstName} ${author?.lastName}`;
  const profilePicture = author?.profilePicture;

  return (
    author && (
      <div className={classNames(Styles.AuthorByline, "flex")}>
        <div>
          <ProfileImage customClasses="ByLineImage" imageURL={profilePicture} />
        </div>
        <div>
          <p className={Styles.authorName}>
            {authorName}
            <span> {author?.bio ? author?.bio : "Writter"}</span>
          </p>
        </div>
      </div>
    )
  );
}

export default AuthorBylineCard;
