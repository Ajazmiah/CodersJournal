import * as React from "react";
import { formatDate } from "../../utils";
import LikeCommentComponent from "../Icon/LikeComment";
import { useLink } from "../../hooks/useLink/useLink";
import AuthorBylineCard from "../AuthorBylineCard/AuthorBylineCard";
import Styles from "./PostCard.module.css";

function PostCard({ posts }) {
  const { handleNavigateToPost } = useLink();

  return (
    posts &&
    posts.length > 0 && (
      <div className={Styles.posts}>
        {posts.map((post) => (
          <div
            key={post._id}
            className={Styles.post}
            onClick={() => handleNavigateToPost(post)}

            
          >
            <div className='space-bottom'>
            <img width={'100%'} src='https://images.pexels.com/photos/159618/still-life-school-retro-ink-159618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
            </div>
            
            <AuthorBylineCard author={post.authorId} />
            <p>{post.summary}</p>

            <div style={{ marginTop: "20px" }}>
            <ul>
              <li>{post?.title}</li>
              <li>{formatDate(post?.createdAt)}</li>
            </ul>
              <LikeCommentComponent />
              
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default PostCard;
