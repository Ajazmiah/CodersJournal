import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useUserPublicProfileMutation } from '../../slices/usersApiSlice';

function UserPublicProfile() {
    const { name } = useParams();
    const id = name.split('-')[1]

    const [gerUserProfile] = useUserPublicProfileMutation()
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const fetchedPost = await gerUserProfile({ id }).unwrap();
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
      }, [gerUserProfile, id]);
    

  return (
    <div> NAME</div>
  )
}

export default UserPublicProfile