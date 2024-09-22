import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function useLink() {
  const location = useLocation();
  const navigate = useNavigate();
  const baseUrl = location.pathname;

  const handleNavigateToPost = (post, path = null) => {
    navigate(baseUrl.replace(baseUrl, path ? path : `/post/${post._id}`));
  };
  return { handleNavigateToPost };
}
