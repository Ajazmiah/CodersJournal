import React from "react";
import Styles from "./ProfileImage.module.css";

function ProfileImage({ imageURL, customClasses }) {
  const classes = [Styles[customClasses], Styles.defaultStyles];


  return (
    <>
      <img
        className={classes.join(" ")}
        src={
          imageURL ||
          "https://media.licdn.com/dms/image/D4E03AQEOudDI4GpDTw/profile-displayphoto-shrink_800_800/0/1698972657267?e=1707955200&v=beta&t=k9sqBSUBrCxCMM2ELswWLA1cu1-PXfSeVS1wgu_qGrA"
        }
        alt="profilepicture"
      />
    </>
  );
}

export default ProfileImage;
