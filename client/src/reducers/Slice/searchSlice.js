import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchPosts: [],
    isLoading: false,
  },
  reducers: {
    ACTION_SEARCH_POSTS: (state, action) => {
      state.isLoading = true;
    },
    SEARCH_POSTS: (state, action) => {
      state.searchPosts = action.payload;
      state.isLoading = false;
    },
  },
});

export const { ACTION_SEARCH_POSTS, SEARCH_POSTS } = searchSlice.actions;

export default searchSlice.reducer;
