import React from "react";
import { useSelector } from 'react-redux';
import AuthorBio from "../AuthorBio/AuthorBio";
import { Link } from "react-router-dom";
import Styles from "./UserProfileInfo.module.css";
import { getIcon } from "../Icon";
import Button from "../Atoms/Button/Button";
import classNames from "classnames";

function UserProfileInfo(props) {

  const {userInfo} = useSelector((state)=>state.auth)
  console.log("user info",userInfo)
  console.log("user props info",props.userInfo)
  return (
    <div className={Styles.userProfileInfo}>
      <div className={classNames('container', Styles.profileInfo)}>
        <div className={Styles.profileLeft}>
          <div className={Styles.profilePicture}>
            <img src={props.userInfo.profilePicture} alt="" />
          </div>

          <div>
            <ul className={Styles.socials}>
              <li>{getIcon("youtube")}</li>
              <li>{getIcon("Fb")}</li>
              <li>{getIcon("github")}</li>
              <li>{getIcon("twitter")}</li>
            </ul>
            {props.userInfo._id==userInfo._id ? <Link to="/profile/update">
              <Button classes="update">Update Account</Button>
            </Link>:null}
          </div>
        </div>

        <div className={Styles.profileRight}>
          <AuthorBio authorInfo={props.userInfo} />
        </div>
      </div>
    </div>
  );
}

export default UserProfileInfo;
