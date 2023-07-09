import React from "react";

import "./search.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Paginate from "../../components/Pagination/Pagination";

export default function Search() {
  const posts = useSelector((state) => state.search.searchPosts);
  const isLoading = useSelector((state) => state.search.isLoading);

  return (
    <div className="search">
      <div className="container-fluid">
        <div className="row d-flex flex-column justify-content-center align-items-center">
          <div className="col">
            <Header />
          </div>
          <div className="col mt-4">
            <Paginate />
          </div>
          <div className="col">
            <div className="row d-flex justify-content-center align-items-start">
              <div className="col col-xl-9 mb-5">
                <Posts posts={posts} isLoading={isLoading} />
              </div>
              <div className="col-xl-3 d-none d-xl-flex justify-content-center align-items-start">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
