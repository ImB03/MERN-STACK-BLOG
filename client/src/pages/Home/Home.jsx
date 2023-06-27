import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import "./home.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Posts from "../../components/Posts/Posts";
import { ACTION_FETCH_ALL_POSTS } from "../../reducers/Slice/postSlice";

export default function Home() {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();

  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);

  const page = params.page || 1;
  const searchQuery = params.searchQuery;

  useEffect(() => {
    dispatch(ACTION_FETCH_ALL_POSTS());
  }, [location]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} isLoading={isLoading} />
        <Sidebar page={page} />
      </div>
    </>
  );
}
