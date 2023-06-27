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
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="commentSection">
      <h2>COMMENT:</h2>
      <div className="commentWrapper">
        <div
          className={
            post?.comments?.length >= 4 ? "userComment overflow" : "userComment"
          }
        >
          <h3>{post?.comments?.length} Comments</h3>

          {post?.comments?.map((comment, index) => (
            <div key={index} ref={commentsRef} className="comment">
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
        <div className="writeComment">
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
            <h3 className="">"You just login to comment!!!"</h3>
          )}
        </div>
      </div>
    </div>
  );
}
