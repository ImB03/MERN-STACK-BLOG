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
    <div className="container-fluid d-flex justify-content-center">
      {isLoading ? (
        <button className="iconLoading">
          <h1>
            <i className="fa fa-circle-o-notch fa-spin"></i>
          </h1>
        </button>
      ) : !post ? (
        <h1 className="detailPost notExit">"The Post Do Not Exit!!!"</h1>
      ) : (
        <div className="detailPost d-flex">
          {user?.result?._id === post?.creator && (
            <div className="userInteract">
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
          <div className="detailPostWrapper">
            <div className="detailPostInfo">
              <div className="detailDesc">
                <div className="detailPostTitle">{post?.title}</div>
                <p className="detailPostDesc">{post?.description}</p>
              </div>

              <div className="createDateAndLikes">
                <span className="detailPostDate">
                  {moment(post?.createdAt).fromNow()}
                </span>
                <button
                  className="detailPostLikes"
                  disabled={!user}
                  onClick={handleLike}
                >
                  {post?.likes?.find((like) => like === user?.result?._id) ? (
                    <ThumbUpAltIcon fontSize="small" />
                  ) : (
                    <ThumbUpAltOutlined fontSize="small" />
                  )}
                  {/* <i class="fa-solid fa-thumbs-up"></i> */}

                  <p className="likeCount">{post?.likes?.length}</p>
                </button>
              </div>

              <div className="detailPostAuthor">
                <div className="avataAuthor">
                  <Avatar
                    alt=""
                    src={user?.result?.imageUrl}
                    className={classes.userAvata}
                  >
                    {user?.result.name.charAt(0).toUpperCase()}
                  </Avatar>
                </div>
                <h3> {post?.name}</h3>
              </div>
            </div>
            <div className="detailPostImage">
              <Image className="detailPostImg" imageUrl={post?.selectedFile} />
            </div>
          </div>
          <div className="detailPostWrapper">
            <CommentSection post={post} />
          </div>
        </div>
      )}
    </div>
  );
}
