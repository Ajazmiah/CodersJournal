import React from "react";
import Styles from "./ProfileImage.module.css";
import Image from "../Image/Image";

function ProfileImage({ empty, imageURL, customClasses }) {
  const classes = [Styles[customClasses], Styles.defaultStyles];

  if (empty) {
    return <div className={Styles['empty']}>
      <span className={Styles['noImage']}> No Profile Image</span>
    </div>;
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
