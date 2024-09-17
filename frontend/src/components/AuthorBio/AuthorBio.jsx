import React from "react";
import Styles from "./AuthorBio.module.css";
import Border from "../Atoms/Border/Border";
import classNames from "classnames";
function AuthorBio({ authorInfo }) {
  const { firstName, lastName } = authorInfo;
  const fullName = `${firstName} ${lastName}`;
  return (
    <div className={Styles.authorBio}>
      <div className={Styles.authorInfo}>
        <p className="heading-2">{fullName}</p>

        <p className={classNames(Styles.authorBioText, 'heading-4 fontSize09em')}>
          <Border borderLocation="left" />
          {authorInfo.bio ? authorInfo.bio : `The user ${fullName} does not have a bio`}
        </p>
      </div>
    </div>
  );
}

export default AuthorBio;
