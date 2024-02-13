import React from 'react'
import {useNavigate, useLocation  } from "react-router-dom";

export function useLink() {
    const location = useLocation();
    const navigate = useNavigate();
    const baseUrl = location.pathname;

    const handleNavigateToPost = (post) => {
        navigate(baseUrl.replace(baseUrl, `/post/${post._id}`));
      };
  return {handleNavigateToPost}
}

