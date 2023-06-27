import React from "react";

import "./search.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";

export default function Search() {
  const posts = useSelector((state) => state.search.searchPosts);
  const isLoading = useSelector((state) => state.search.isLoading);

  return (
    <>
      <Header />
      <div className="search">
        <Posts posts={posts} isLoading={isLoading} />
        <Sidebar />
      </div>
    </>
  );
}
