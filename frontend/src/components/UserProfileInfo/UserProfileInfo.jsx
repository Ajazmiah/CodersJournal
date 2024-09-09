import React from "react";
import AuthorBio from "../AuthorBio/AuthorBio";
import { Link } from "react-router-dom";
import Styles from "./UserProfileInfo.module.css";
import { getIcon } from "../Icon";
import Button from "../Atoms/Button/Button";
import classNames from "classnames";

function UserProfileInfo({ userInfo }) {
  return (
    <div className={Styles.userProfileInfo}>
      <div className={classNames('container', Styles.profileInfo)}>
        <div className={Styles.profileLeft}>
          <div className={Styles.profilePicture}>
            <img src={userInfo.profilePicture} alt="" />
          </div>

          <div>
            <ul className={Styles.socials}>
              <li>{getIcon("youtube")}</li>
              <li>{getIcon("Fb")}</li>
              <li>{getIcon("github")}</li>
              <li>{getIcon("twitter")}</li>
            </ul>
            <Link to="/profile/update">
              <Button className="color-dark ">Update Account</Button>
            </Link>
          </div>
        </div>

        <div className={Styles.profileRight}>
          <AuthorBio authorInfo={userInfo} />
        </div>
      </div>
    </div>
  );
}

export default UserProfileInfo;
