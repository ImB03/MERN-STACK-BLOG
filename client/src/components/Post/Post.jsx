import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./post.css";
import Image from "../Image/Image";

export default function Post({ post }) {
  return (
    <Link className="post link" to={`/detailpost/${post._id}`}>
      <Image className="postImg" imageUrl={post.selectedFile} />
      <div className="postInfo">
        <div className="postUserName">
          <div className="userName">{post.name}</div>
          <div className="postDate">{moment(post.createdAt).fromNow()}</div>
        </div>
        <div className="postTags">
          <div className="postTag">{post.tags.map((tag) => `#${tag} `)}</div>
        </div>
        <div className="postTitleAndDesc">
          <div className="postTitle">{post.title}</div>
          <div className="postDescription">{post.description}</div>
        </div>
      </div>
    </Link>
  );
}
