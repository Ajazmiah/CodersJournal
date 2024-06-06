import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useSelector } from "react-redux";
function AuthorBylineCard({author}) {
  const { userInfo } = useSelector((state) => state.auth);

  const authorName =`${author?.firstName} ${author?.lastName}`

  return (
    <div>
      <div>
        <ProfileImage
          customClasses="ByLineImage"
          imageURL={author?.profilePicture}
        />
      </div>
      <div>
        {authorName}
        <p>
          {author?.bio ? author.bio : "Writter"}
        </p>
      </div>
    </div>
  );
}

export default AuthorBylineCard;
