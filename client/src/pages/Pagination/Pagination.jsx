import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./pagination.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import Paginate from "../../components/Pagination/Pagination";

export default function Pagination() {
  // const params = useParams();

  // const page = params.page || 1;
  // const searchQuery = params.searchQuery;

  const posts = useSelector((state) => state.pagination.postsPagination.posts);
  const isLoading = useSelector((state) => state.pagination.isLoading);

  return (
    <div className="pagination">
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
                <Sidebar/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
