import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    // console.log(req);
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchAllPosts = () => API.get("/posts");
export const fetchOnePost = (postId) => API.get(`/posts/${postId}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(`/search/findbysearch?searchQuery=${searchQuery || "none"}`);
export const fetchPostsByPagination = (page) =>
  API.get(`/pagination?page=${page}`);

export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (postId, infoUpdatePost) =>
  API.patch(`/posts/${postId}`, infoUpdatePost);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);
export const likePost = (postId) => API.patch(`/posts/likepost/${postId}`);
export const commentPost = (dataComment, postId) =>
  API.patch(`/posts/commentpost/${postId}`, { dataComment });

export const signUp = (infoUser) => API.post("/auth/signup", infoUser);
export const signIn = (infoUser) => API.post("/auth/signin", infoUser);
