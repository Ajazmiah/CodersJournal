import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
function AuthorBylineCard() {
  const { userInfo } = useSelector((state) => state.auth);
  const userFullName = userInfo?.firstName + " " + userInfo?.lastName;
  return (
    <Box sx={{ display: "flex", marginTop: "20px" }}>
      <Box sx={{ marginRight: "10px" }}>
        <ProfileImage
          customClasses="ByLineImage"
          imageURL={userInfo?.profilePicture}
        />
      </Box>
      <Box>
        {userFullName}
        <Typography variant="body2">
          {userInfo?.bio ? userInfo.bio : "Writter"}
        </Typography>
      </Box>
    </Box>
  );
}

export default AuthorBylineCard;
