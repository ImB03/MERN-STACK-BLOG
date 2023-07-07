import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./post.css";
import Image from "../Image/Image";

export default function Post({ post }) {
  return (
    <Link
      className="post mt-4 link position-relative d-flex flex-column justify-content-start align-items-center"
      to={`/detailpost/${post._id}`}
    >
      <Image
        className="postImg position-absolute"
        imageUrl={post.selectedFile}
      />
      <div className="infoCreator container-fluid d-flex flex-column justify-content-between align-items-start">
        <div className="infoCreator1 mt-2">
          <div className="creatorName">{post.name}</div>
          <div className="postDate">{moment(post.createdAt).fromNow()}</div>
        </div>
        <div className="infoCreator2">
          <div className="postTags mt-2">
            <div className="postTag">{post.tags.map((tag) => `#${tag} `)}</div>
          </div>
          <div className="postTitle mt-1 overflow-hidden">{post.title}</div>
          <div className="postDescription mt-1 overflow-hidden">
            {post.description}
          </div>
        </div>
      </div>
    </Link>
  );
}
