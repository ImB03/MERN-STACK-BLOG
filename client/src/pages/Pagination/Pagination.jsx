import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./pagination.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Pagination() {
  // const params = useParams();

  // const page = params.page || 1;
  // const searchQuery = params.searchQuery;

  const posts = useSelector((state) => state.pagination.postsPagination.posts);
  const isLoading = useSelector((state) => state.pagination.isLoading);

  return (
    <>
      <Header />
      <div className="paginationPage">
        <Posts posts={posts} isLoading={isLoading} />
        <Sidebar />
      </div>
    </>
  );
}
