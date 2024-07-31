import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useUserPublicProfileMutation } from '../../slices/usersApiSlice';
import FeaturedCard from '../FeaturedCard/FeaturedCard';

function UserPublicProfile() {
    const { id } = useParams();
    const userId = id.split('-')[1]

    const [gerUserProfile] = useUserPublicProfileMutation()
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const fetchedPost = await gerUserProfile({ userId }).unwrap();
            console.log("FECTHED", fetchedPost)
            setPosts(fetchedPost);
          } catch (err) {
            if (err.status === 404) {
              navigate("/404");
            } else {
              console.log(err);
            }
          }
        };
    
        fetchPost();
      }, [gerUserProfile, userId]);
    
    if(!posts) return 

  return (
    <div>
     {posts.map(post => <FeaturedCard post ={post}/>)}
    </div>
  )
}

export default UserPublicProfile