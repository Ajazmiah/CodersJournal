import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
function AuthorBylineCard({author}) {
  const { userInfo } = useSelector((state) => state.auth);

  const authorName =`${author.firstName} ${author.lastName}`

  return (
    <Box sx={{ display: "flex", marginTop: "20px" }}>
      <Box sx={{ marginRight: "10px" }}>
        <ProfileImage
          customClasses="ByLineImage"
          imageURL={author?.profilePicture}
        />
      </Box>
      <Box>
        {authorName}
        <Typography variant="body2">
          {author?.bio ? author.bio : "Writter"}
        </Typography>
      </Box>
    </Box>
  );
}

export default AuthorBylineCard;
