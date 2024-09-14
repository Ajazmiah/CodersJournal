import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../slices/postsSlice";
import { useAllUserPostsMutation } from "../../slices/postsApiSlice";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import Image from "../../components/Image/Image";
import Styles from "./ProfileScreen.module.css";
import UserProfileInfo from "../../components/UserProfileInfo/UserProfileInfo";
import FeaturedCard from "../../components/FeaturedCard/FeaturedCard";
import Border from "../../components/Atoms/Border/Border";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);


  const [getPosts] = useAllUserPostsMutation();

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
    <div>
      <UserProfileInfo userInfo={userInfo} />
      <div className="container">
        {posts?.map((post) => (
          <>
            <FeaturedCard post={post} />
            <Border />
          </>
        ))}
      </div>
    </div>
  );
};

export default ProfileScreen;
