import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: { comments: [] },
    isLoading: false,
  },
  reducers: {
    ACTION_FETCH_ALL_POSTS: (state, action) => {
      state.isLoading = true;
    },
    ACTION_FETCH_ONE_POST: (state, action) => {
      state.isLoading = true;
      state.post = {};
    },
    ACTION_CREATE_POST: () => {},
    ACTION_UPDATE_POST: () => {},
    ACTION_DELETE_POST: () => {},
    ACTION_LIKE_POST: () => {},
    ACTION_COMMENT_POST: () => {},
    FETCH_ALL_POSTS: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    FETCH_ONE_POST: (state, action) => {
      state.post = action.payload;
      state.isLoading = false;
    },
    CREATE_POST: (state, action) => {
      state.posts.push(action.payload);
    },
    UPDATE_POST: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.postId
          ? action.payload.infoUpdatePost
          : post
      );
    },
    DELETE_POST: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    LIKE_POST: (state, action) => {
      state.posts = state.posts.map((post) => {
        return post._id === action.payload.postId
          ? action.payload.likedPost
          : post;
      });
      state.post = state.posts.find(
        (post) => post._id === action.payload.postId
      );
    },
    COMMENT_POST: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const {
  ACTION_FETCH_ALL_POSTS,
  ACTION_FETCH_ONE_POST,
  ACTION_CREATE_POST,
  ACTION_UPDATE_POST,
  ACTION_DELETE_POST,
  ACTION_LIKE_POST,
  ACTION_COMMENT_POST,
  FETCH_ALL_POSTS,
  FETCH_ONE_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  COMMENT_POST,
} = postSlice.actions;

export default postSlice.reducer;
