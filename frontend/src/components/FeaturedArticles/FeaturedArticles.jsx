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

  const [posts, setPosts] = useState([]);
  const [leadPost, setLeadPost] = useState(null);
  const [noMore, setNoMore] = useState(false);

  const [limit, setLimit] = useState(3);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const allPost = userInfo
          ? await getExludedUserPosts().unwrap()
          : await getPosts(limit).unwrap();

        setPosts(allPost.SignedPosts);
        setLeadPost(allPost.SignedPosts[0]);

        if (posts.length === allPost.totalPosts) {
          setNoMore(true);
        }
      } catch (error) {
        setNoMore(true);
        toast.error(error.data.message);
      }
    };

    getAllPosts();
  }, [limit]);

  console.log(posts);

  if (posts?.length < 1)
    return (
      <>
        <h1 className="header4">No Feed ...</h1>
        <p>Public feed will show up here when available</p>
      </>
    );

  return (
    <div className={Styles.FeaturedArticles}>
      <div className={Styles.LeadArticle}>
        <LeadArticle post={leadPost} />
        <Border />
      </div>

      <div className={Styles.RecentArticles}>
        {posts.map((post) => {
          if (post._id !== leadPost._id)
            return <FeaturedCard key={post._id} post={post} />;
        })}
      </div>
      <div style={{ textAlign: "center" }}>
        {noMore ? (
          <span>No More</span>
        ) : (
          <Button
            onClick={() => setLimit((prev) => prev + 3)}
            classes={"update"}
          >
            Load More ..
          </Button>
        )}
      </div>
    </div>
  );
}

export default FeaturedArticles;
