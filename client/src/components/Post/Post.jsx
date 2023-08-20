import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./post.css";
import Image from "../Image/Image";

export default function Post({ post }) {
  return (
    <Link
      className="post row link position-relative d-flex flex-column justify-content-start align-items-center"
      to={`/detailpost/${post._id}`}
    >
      <Image
        className="postImg position-absolute"
        imageUrl={post.selectedFile}
      />
      <div className="col infoCreator p-3 d-flex flex-column justify-content-between align-items-start">
        <div className="infoCreator1 row d-flex flex-column">
          <div className="col creatorName">{post.name}</div>
          <div className="col postDate">{moment(post.createdAt).fromNow()}</div>
        </div>
        <div className="infoCreator2 row d-flex flex-column justify-content-center align-items-center">
          <div className="col postTags overflow-hidden">
            {post.tags.map((tag) => `#${tag} `)}
          </div>
          <div className="col postTitle overflow-hidden">{post.title}</div>
          <div className="col postDescription overflow-hidden">
            {post.description}
          </div>
        </div>
      </div>
    </Link>
  );
}
