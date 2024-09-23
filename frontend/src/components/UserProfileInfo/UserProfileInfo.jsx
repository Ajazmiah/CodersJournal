import React, { Children } from "react";
import AuthorBio from "../AuthorBio/AuthorBio";
import { Link } from "react-router-dom";
import Styles from "./UserProfileInfo.module.css";
import { getIcon } from "../Icon";
import Button from "../Atoms/Button/Button";
import classNames from "classnames";
import ProfileImage from "../ProfileImage/ProfileImage";

const UpdateAccount = () => {
  return (
    <Link to="/profile/update">
      <Button classes="update">Update Account</Button>
    </Link>
  );
};

function UserProfileInfo({ userInfo, children }) {
  return (
    <div className={Styles.userProfileInfo}>
      <div className={classNames("container", Styles.profileInfo)}>
        <div className={Styles.profileLeft}>
          <div className={Styles.profilePicture}>
            <ProfileImage
              customClasses="profileImage"
              empty
              imageURL={userInfo.profilePicture}
            />
          </div>

           <div>
            {/* <ul className={Styles.socials}>
              <li>{getIcon("youtube")}</li>
              <li>{getIcon("Fb")}</li>
              <li>{getIcon("github")}</li>
              <li>{getIcon("twitter")}</li>
            </ul> */}
            {children}
          </div> 
        </div>

        <div className={Styles.profileRight}>
          <AuthorBio authorInfo={userInfo} />
        </div>
      </div>
    </div>
  );
}

UserProfileInfo.UpdateAccount = UpdateAccount;

export default UserProfileInfo;
