import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../slices/postsSlice";
import { useAllUserPostsMutation } from "../../slices/postsApiSlice";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import Image from "../../components/Image/Image";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  console.log("POSTS PROFILE", posts);

  const userFullName = userInfo?.firstName + " " + userInfo?.lastName;

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

    console.log("USERR INFOR", userInfo)

    getAllPosts();
  }, []);

  return (
    <>
      <div>
        <div>
          <div>
            <Image src={userInfo?.profilePicture} alt="HI" />
          </div>
          <div>
            <div>{userFullName}</div>

            <ul>
              <li>
                <img src="instagram-icon.png" alt="Instagram Icon" />
              </li>
              <li>
                <img src="twitter-icon.png" alt="Twitter Icon" />
              </li>
              <li>
                <img src="linkedin-icon.png" alt="LinkedIn Icon" />
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <p> Number of Posts</p>
                <span>{posts?.length} </span>
              </li>
              <li>
                <p>Location</p>
                <span>{"New York"}</span>
              </li>
              <li>
                <p> Joined</p>
                <span>{"January 15, 2021"}</span>
              </li>
            </ul>
            <Link to="/profile/update">
              <button>update account</button>
            </Link>
          </div>
        </div>

        <div>
          <PostCard posts={posts} />
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
