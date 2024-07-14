import { apiSlice } from "./apiSlice";

const POSTS_URL = "/api/blog";

const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    posts: builder.mutation({
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
    getPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/post/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),
    editPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/edit`,
        method: 'POST',
        body: data
      })
    }),
    getMorePostOnScroll: builder.mutation({
      query: () => ({
        url:`${POSTS_URL}/allPost`,
        method:"GET",
      })
    }),
    deletePost: builder.mutation({
      query: (data) => ({
        url:`${POSTS_URL}/deletepost`,
        method:"POST",
        body: data
      })
    })
  }),
});

export const { usePostsMutation, useSubmitPostMutation, useGetPostMutation, useGetMorePostOnScrollMutation , useDeletePostMutation, useEditPostMutation} =
  postsApi;
