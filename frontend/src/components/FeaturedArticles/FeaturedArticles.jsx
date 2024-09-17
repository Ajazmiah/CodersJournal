import React, { useEffect, useState } from "react";
import LeadArticle from "../LeadArticle/LeadArticle";
import FeaturedCard from "../FeaturedCard/FeaturedCard";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserPostsMutation,
  useExpludeUserPostsMutation,
} from "../../slices/postsApiSlice";
import Border from "../Atoms/Border/Border";
import Styles from "./FeaturedArticles.module.css";
import { toast } from "react-toastify";
import Button from "../Atoms/Button/Button";
function FeaturedArticles() {
  const { userInfo } = useSelector((state) => state.auth);
  const [getPosts] = useGetUserPostsMutation();
  const [getExludedUserPosts] = useExpludeUserPostsMutation();

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const allPost = userInfo
          ? await getExludedUserPosts().unwrap()
          : await getPosts().unwrap();

        setPosts(allPost);
      } catch (error) {
        toast.error(error.data.message);
      }
    };

    getAllPosts();
  }, []);

  const handleClick = () => {};

  if (!posts) return;

  return (
    <div className={Styles.FeaturedArticles}>
      <div className={Styles.LeadArticle}>
        <LeadArticle post={posts[posts.length - 1]} />
        <Border />
      </div>

      <div className={Styles.RecentArticles}>
        {posts.slice(-3).map((post) => (
          <FeaturedCard key={post._id} post={post} />
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <Button onClick={handleClick} classes={"update"}>
          Load More ..
        </Button>
      </div>
    </div>
  );
}

export default FeaturedArticles;
