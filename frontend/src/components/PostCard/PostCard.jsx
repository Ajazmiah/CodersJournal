import * as React from "react";

import { formatDate } from "../../utils";

import LikeCommentComponent from "../Icon/LikeComment";
import {useLink} from "../../hooks/useLInk/useLink"
import AuthorBylineCard from "../AuthorBylineCard/AuthorBylineCard";

function PostCard({ posts }) {

  console.log("BYLINE POSTS", posts)

  const {handleNavigateToPost} = useLink()
  return (
    posts && (
      <div>
        
        {posts.map((post) => (
          <div key={post._id} item xs={12} md={4} sm={12}>
            
            <div>
              <div onClick={() => handleNavigateToPost(post)}>
                <ul>
                  <li>{post?.title}</li>
                  <li>{formatDate(post?.createdAt)}</li>


                </ul>
                <AuthorBylineCard author={post.authorId} />
                <p>{post.summary}</p>
              </div>
            </div>
            <div sx={{ marginTop: "20px" }}>
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
