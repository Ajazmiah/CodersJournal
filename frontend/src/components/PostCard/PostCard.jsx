import * as React from "react";
import { formatDate } from "../../utils";
import LikeCommentComponent from "../Icon/LikeComment";
import { useLink } from "../../hooks/useLink/useLink";
import AuthorBylineCard from "../AuthorBylineCard/AuthorBylineCard";
import Styles from './PostCard.module.css';

function PostCard({ posts }) {
  const { handleNavigateToPost } = useLink();

  return (
    posts && posts.length > 0 && (
      <div className={Styles.posts}>
        {posts.map((post) => (
          <div key={post._id} className={Styles.post}>
            <div onClick={() => handleNavigateToPost(post)}>
              <ul>
                <li>{post?.title}</li>
                <li>{formatDate(post?.createdAt)}</li>
              </ul>
              <AuthorBylineCard author={post.authorId} />
              <p>{post.summary}</p>
            </div>
            <div style={{ marginTop: "20px" }}>
              <LikeCommentComponent />
              {/* {post.authorId && <Button onClick={() => alert(post._id)}>Delete</Button>} */}
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default PostCard;
