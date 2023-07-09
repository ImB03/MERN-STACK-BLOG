import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import "./home.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Posts from "../../components/Posts/Posts";
import { ACTION_FETCH_ALL_POSTS } from "../../reducers/Slice/postSlice";
import Paginate from "../../components/Pagination/Pagination";

export default function Home() {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();

  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);

  // const page = params.page || 1;
  // const searchQuery = params.searchQuery;

  useEffect(() => {
    dispatch(ACTION_FETCH_ALL_POSTS());
  }, [location]);

  return (
    <div className="home">
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
