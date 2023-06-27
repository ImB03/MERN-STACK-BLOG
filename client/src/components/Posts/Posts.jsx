import React from "react";
import { useSelector } from "react-redux";

import "./posts.css";
import Post from "../Post/Post";

export default function Posts({ posts, isLoading }) {
  return (
    <div className="posts">
      {isLoading ? (
        <div className="iconLoading">
          <h1>
            <i className="fa fa-circle-o-notch fa-spin"></i>
          </h1>
        </div>
      ) : posts?.length === 0 ? (
        <h1>'Post not exit'</h1>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
}
