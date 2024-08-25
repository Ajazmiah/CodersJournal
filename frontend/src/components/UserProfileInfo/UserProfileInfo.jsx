import React from "react";
import AuthorBio from "../AuthorBio/AuthorBio";
import { Link } from "react-router-dom";
import Styles from "./UserProfileInfo.module.css";
import { getIcon } from "../Icon";

function UserProfileInfo({ userInfo }) {
  const userFullName = userInfo?.firstName + " " + userInfo?.lastName;
  return (
    <div className={Styles.userProfileInfo}>
      <div className="container">
        <div>
          <AuthorBio authorInfo={userInfo} />
          <ul>
            <li>
              <p> Number of Posts</p>
              {/* <span>{posts?.length} </span> */}
            </li>
            <li>
              <p>Location</p>
              <span>{"New York"}</span>
            </li>
            <li>
              <p> Joined</p>
              <span>{"January 15, 2021"}</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className={Styles.socials}>
            <li>{getIcon("youtube")}</li>
            <li>{getIcon("Fb")}</li>
            <li>{getIcon("github")}</li>
            <li>{getIcon("twitter")}</li>
          </ul>
        </div>

        <Link to="/profile/update">
          <button>update account</button>
        </Link>
      </div>
    </div>
  );
}

export default UserProfileInfo;
