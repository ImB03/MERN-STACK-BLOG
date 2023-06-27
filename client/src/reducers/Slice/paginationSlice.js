import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    postsPagination: { posts: [] },
    isLoading: false,
  },
  reducers: {
    ACTION_PAGINATION: (state, action) => {
      state.isLoading = true;
      state.postsPagination.posts = [];
    },
    PAGINATION: (state, action) => {
      state.postsPagination = action.payload;
      state.isLoading = false;
    },
  },
});

export const { ACTION_PAGINATION, PAGINATION } = paginationSlice.actions;

export default paginationSlice.reducer;
