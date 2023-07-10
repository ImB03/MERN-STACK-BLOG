import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./commentSection.css";
import { ACTION_COMMENT_POST } from "../../reducers/Slice/postSlice";
import { Avatar } from "@material-ui/core";
import useStyles from "./styles";

export default function CommentSection({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const commentsRef = useRef();

  const user = JSON.parse(localStorage.getItem("profile"));

  // useEffect(() => {
  //   dispatch(ACTION_FETCH_ONE_POST(post._id));
  // }, []);

  const handleGetComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    const dataComment = `${user.result.name}: ${comment}`;
    dispatch(ACTION_COMMENT_POST({ dataComment, postId: post._id }));
    setComment("");
  };

  return (
    <div className="commentSection mt-5">
      <h2>COMMENT:</h2>
      <h4>{post?.comments?.length} Comments</h4>
      <div className="commentWrapper d-flex flex-column-reverse flex-md-row justify-content-between">
        <div
          className={`col mb-4 me-md-2 ${
            post?.comments?.length >= 4 ? "overflow-scroll overflow" : null
          } userComment`}
        >
          {post?.comments?.map((comment, index) => (
            <div key={index} ref={commentsRef} className="comment d-flex justify-content-start align-items-center p-1 mb-2">
              <Avatar
                className={classes.userAvata}
                alt=""
                src={user?.result.imageUrl}
              >
                {user?.result.name.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                <strong>{comment.split(": ")[0]}</strong>
                <br />
                {comment.split(":")[1]}
              </div>
            </div>
          ))}
        </div>
        <div className="col mb-4 ms-md-2 writeComment d-flex flex-column">
          {user ? (
            <>
              <textarea
                placeholder="Comment here..."
                value={comment}
                onChange={handleGetComment}
              />
              <button
                type="button"
                className={`submitButtonComment ${
                  !comment && "submitButtonCommentDisabled"
                }`}
                onClick={handleSubmitComment}
              >
                COMMENT
              </button>
            </>
          ) : (
            <h3 className="d-flex justify-content-center">"You need logged to give a comment"</h3>
          )}
        </div>
      </div>
    </div>
  );
}
