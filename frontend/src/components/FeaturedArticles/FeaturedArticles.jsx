import React, { useEffect, useState } from "react";
import LeadArticle from "../LeadArticle/LeadArticle";
import FeaturedCard from "../FeaturedCard/FeaturedCard";
import { useGetMorePostOnScrollMutation } from "../../slices/postsApiSlice";
import Border from "../Atoms/Border/Border";
import Styles from './FeaturedArticles.module.css'
function FeaturedArticles() {
  const [getPosts] = useGetMorePostOnScrollMutation();

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const allPost = await getPosts().unwrap();

        setPosts(allPost);
        console.log("HOME", allPost);
      } catch (error) {
        console.log("ERROR", error);
      }
    };

    getAllPosts();
  }, []);

  if (!posts) return;

  return (
    <div className={Styles.FeaturedArticles}>
      <div className={Styles.LeadArticle}>
        <LeadArticle post={posts[posts.length - 1]} />
        <Border/>
      </div>
 
      <div className={Styles.RecentArticles}>
        {posts.slice(-3).map((post) => (
          <FeaturedCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedArticles;
