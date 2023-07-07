import React from "react";
import { useSelector } from "react-redux";

import "./posts.css";
import Post from "../Post/Post";

export default function Posts({ posts, isLoading }) {
  return (
    <div className="posts">
      {isLoading ? (
        <div className="iconLoading d-flex justify-content-center align-items-center">
          <i className="fa fa-circle-o-notch fa-spin"></i>
        </div>
      ) : posts?.length === 0 ? (
        <h1 className="d-flex justify-content-center align-items-center">
          'Blog not exit'
        </h1>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div
              key={post._id}
              className="col d-flex justify-content-start align-items-center"
            >
              <Post post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
