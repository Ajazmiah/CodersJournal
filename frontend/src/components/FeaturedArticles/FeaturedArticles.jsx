import React, { useEffect, useState } from "react";
import LeadArticle from "../LeadArticle/LeadArticle";
import FeaturedCard from "../FeaturedCard/FeaturedCard";
import { useGetMorePostOnScrollMutation } from "../../slices/postsApiSlice";

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
    <div>
      <div>
        <LeadArticle post={posts[posts.length - 1]} />
      </div>
      <div>
        {posts.slice(-3).map((post) => (
          <FeaturedCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedArticles;
