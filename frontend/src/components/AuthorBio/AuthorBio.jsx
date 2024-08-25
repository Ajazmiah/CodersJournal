import React from "react";
import Styles from "./AuthorBio.module.css";
import Border from "../Atoms/Border/Border";
import classNames from "classnames";
function AuthorBio({ authorInfo }) {
  const { firstName, lastName } = authorInfo;
  const fullName = `${firstName} ${lastName}`;
  return (
    <div className={Styles.authorBio}>
      {/* <div className={Styles.authorImage}>
        <img src={authorInfo.profilePicture} alt="" />
      </div> */}

      <div className={Styles.authorInfo}>
        <p className="heading-2">{fullName}</p>

        <p className={classNames(Styles.authorBioText, 'heading-4 fontSize09em')}>
          <Border borderLocation="left" />
          Hey Guys , my name is Ajaz. I make educational videos on youtube and I use this platform to write article and explain the video tutorial more in depth and giving you guys links and study materisls.
        </p>
      </div>
    </div>
  );
}

export default AuthorBio;
