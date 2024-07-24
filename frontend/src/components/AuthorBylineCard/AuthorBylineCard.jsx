import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useSelector } from "react-redux";
import Styles from "./AuthorBylineCard.module.css";
import classNames from "classnames";
function AuthorBylineCard({ authorName, profilePicture, bio = null }) {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className={classNames(Styles.AuthorByline, "flex")}>
      <div>
        <ProfileImage customClasses="ByLineImage" imageURL={profilePicture} />
      </div>
      <div>
        <p className={Styles.authorName}>
          {authorName}, <span> {bio ? bio : "Writter"}</span>
        </p>
      </div>
    </div>
  );
}

export default AuthorBylineCard;
