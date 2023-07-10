import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

import "./postDetail.css";
import { ACTION_DELETE_POST } from "../../reducers/Slice/postSlice";
import { ACTION_LIKE_POST } from "../../reducers/Slice/postSlice";
import CommentSection from "../CommentSection/CommentSection";
import Image from "../Image/Image";
import { Avatar } from "@material-ui/core";
import useStyles from "./styles";

export default function DetailPost({ isLoading }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams().postId;
  const dispatch = useDispatch();

  const post = useSelector((state) => state.posts.post);
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleDelete = (e) => {
    e.preventDefault();
    navigate("/");
    dispatch(ACTION_DELETE_POST(params));
  };

  const handleLike = (e) => {
    e.preventDefault();
    dispatch(ACTION_LIKE_POST(params));
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      {isLoading ? (
        <button className="iconLoading">
          <h1>
            <i className="fa fa-circle-o-notch fa-spin"></i>
          </h1>
        </button>
      ) : !post ? (
        <h1 className="detailPost notExit">"The Post Do Not Exit!!!"</h1>
      ) : (
        <div className="detailPost col col-md-12 d-flex flex-column flex-row">
          {user?.result?._id === post?.creator && (
            <div className="col userInteract d-flex justify-content-end">
              <Link
                to={`/updatepost/${params}`}
                className="detailPostIcon link"
              >
                <i className="far fa-edit"></i>
              </Link>
              <div className="detailPostIcon" onClick={handleDelete}>
                <i className="far fa-trash-alt"></i>
              </div>
            </div>
          )}
          <div className="col detailPostWrapper d-flex flex-column-reverse flex-md-row justify-content-between">
            <div className="col me-md-1 detailPostInfo d-flex flex-column-reverse flex-md-column justify-content-between">
              <div className="detailDesc">
                <div className="detailPostTitle">{post?.title}</div>
                <p className="detailPostDesc">{post?.description}</p>
              </div>
              <div className="">
                <div className="createDateAndLikes mb-3 d-flex justify-content-between align-items-center">
                  <span className="detailPostDate">
                    {moment(post?.createdAt).fromNow()}
                  </span>
                  <button
                    className="detailPostLikes d-flex"
                    disabled={!user}
                    onClick={handleLike}
                  >
                    {post?.likes?.find((like) => like === user?.result?._id) ? (
                      <ThumbUpAltIcon className="me-1" fontSize="small" />
                    ) : (
                      <ThumbUpAltOutlined className="me-1" fontSize="small" />
                    )}
                    <p className="likeCount m-0">{post?.likes?.length}</p>
                  </button>
                </div>
                <div className="detailPostAuthor mb-3 d-flex align-items-center">
                  <div className="avataAuthor">
                    <Avatar
                      alt=""
                      src={user?.result?.imageUrl}
                      className={classes.userAvata}
                    >
                      {user?.result.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </div>
                  <h4 className="mb-0 ms-2">{post?.name}</h4>
                </div>
              </div>
            </div>
            <div className="col mb-3 ms-md-1 detailPostImage d-flex justify-content-end">
              <Image className="detailPostImg" imageUrl={post?.selectedFile} />
            </div>
          </div>
          <div className="col detailPostWrapper">
            <CommentSection post={post} />
          </div>
        </div>
      )}
    </div>
  );
}
