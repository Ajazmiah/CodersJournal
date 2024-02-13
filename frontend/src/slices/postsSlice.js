import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      console.log("ACTION", action);
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
