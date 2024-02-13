import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../slices/postsSlice";
import { usePostsMutation } from "../../slices/postsApiSlice";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import { Button, Container, Grid } from "@mui/material";
import Styles from "./ProfileScreen.module.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import classNames from "classnames";
import Image from "../../components/Image/Image";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const { posts } = useSelector((state) => state.posts);

  const userFullName = userInfo.firstName + " " + userInfo.lastName;

  const [getPosts] = usePostsMutation();

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const allPost = await getPosts().unwrap();
  
        dispatch(setPosts(allPost));
      } catch (err) {
        console.log("Error:", err);
      }
    };

    getAllPosts();
  }, []);

  return (
    <>
      <Container>
        <Grid
          container
          spacing={4}
          className={classNames("section-space-bottom-13", Styles["profile"])}
        >
          <Grid className={Styles["profile-img"]} item xs={12} md={5}>
            <Image src={userInfo?.profilePicture} alt="HI"/>

            
          </Grid>
          <Grid item xs={12} md={7}>
            <div className={Styles["profile-top"]}>
              <div className={Styles["profile-name"]}>{userFullName}</div>

              <ul className={Styles["content-socials"]}>
                <li>
                  <InstagramIcon fontSize="large" />
                </li>
                <li>
                  <TwitterIcon fontSize="large" />
                </li>
                <li>
                  <LinkedInIcon fontSize="large" />
                </li>
              </ul>
            </div>
            <div className={Styles["profile-bottom"]}>
              <ul className={Styles["content-info"]}>
                <li className={Styles["content-info-list"]}>
                  <p> Number of Posts</p>
                  <span>{posts?.length} </span>
                </li>
                <li className={Styles["content-info-list"]}>
                  <p>Location</p>
                  <span>{"New York"}</span>
                </li>
                <li className={Styles["content-info-list"]}>
                  <p> Joined</p>
                  <span>{"January 15, 2021"}</span>
                </li>
              </ul>
              <Link to="/profile/update">
                <Button variant="contained" color="primary">
                  update account
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>

        <div className="space-top-9">
          <PostCard posts={posts} />
        </div>
      </Container>
    </>
  );
};

export default ProfileScreen;
