import React from "react";
import Styles from "./ProfileImage.module.css";
import Image from "../Image/Image";
import { getIcon } from "@components/Icon";
import classNames from "classnames";

function ProfileImage({ empty, imageURL, customClasses }) {
  const classes = [Styles[customClasses], Styles.defaultStyles];

  console.log("imageURL", imageURL)

  if (imageURL === undefined || imageURL === null) {
    return (
      <div className={classNames(Styles[customClasses], Styles["avatar"])}>
        {getIcon("user")}
      </div>
    );
  }

  return (
    <>
      <img
        className={classes.join(" ")}
        loading={"eager"}
        src={imageURL}
        alt="profilepicture"
      />
    </>
  );
}

export default ProfileImage;
