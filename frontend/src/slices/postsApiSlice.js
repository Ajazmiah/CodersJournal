import { apiSlice } from "./apiSlice";
import dotenv from "dotenv";

dotenv.config();

const POSTS_URL ="https://coderjournal-backend.onrender.com/api/blog";

console.log("URL", POSTS_URL)

const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allUserPosts: builder.mutation({
      query: () => ({
        url: `${POSTS_URL}/create`,
        method: "GET",
      }),
    }),
    submitPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    //single Post
    getPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/post/${data.id}`,
        method: "GET",
      }),
    }),
    editPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/edit`,
        method: "POST",
        body: data,
      }),
    }),
    getUserPosts: builder.mutation({
      query: () => ({
        url: `${POSTS_URL}/allPost`,
        method: "GET",
      }),
    }),
    deletePost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/deletepost`,
        method: "POST",
        body: data,
      }),
    }),

    expludeUserPosts: builder.mutation({
      query: () => ({
        url: `${POSTS_URL}/getUserPosts`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAllUserPostsMutation,
  useSubmitPostMutation,
  useGetPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetUserPostsMutation,
  useExpludeUserPostsMutation,
} = postsApi;
