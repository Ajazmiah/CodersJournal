import React from "react";
import Styles from "./ProfileImage.module.css";
import Image from "../Image/Image";

function ProfileImage({ imageURL, customClasses }) {
  const classes = [Styles[customClasses], Styles.defaultStyles];

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
