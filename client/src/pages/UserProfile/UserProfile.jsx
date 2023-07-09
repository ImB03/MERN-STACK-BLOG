import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";

import "./userProfile.css";
import Posts from "../../components/Posts/Posts";
import { ACTION_FETCH_ALL_POSTS } from "../../reducers/Slice/postSlice";
import useStyles from "./styles";

export default function UserProfile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState("Your blog");

  const isLoading = useSelector((state) => state.posts.isLoading);

  const user = JSON.parse(localStorage.getItem("profile"));
  const posts = useSelector((state) => state.posts.posts);
  const numberUserPost = posts.filter(
    (post) => user?.result?._id === post.creator
  );

  const getDataPosts = () => {
    var userPosts;
    if (state === "Your blog") {
      userPosts = posts.filter((post) => user?.result?._id === post.creator);
    } else if (state === "Liked") {
      userPosts = posts.filter((post) => post?.likes.includes(post.creator));
    }
    return userPosts;
  };

  useEffect(() => {
    dispatch(ACTION_FETCH_ALL_POSTS());
  }, [location]);

  return (
    <div className="userProfile container mt-5">
      <div className="userProfileWrapper row d-flex p-4 justify-content-center align-items-center">
        <div className="userProfileInfo row d-flex mb-3 flex-column flex-md-row justify-content-center align-items-center">
          <Avatar
            className={`${classes.userAvata} col-md-2 row mb-3`}
            alt=""
            src={user?.result.imageUrl}
          >
            {user?.result.name.charAt(0).toUpperCase()}
          </Avatar>
          <div className="userInfo ms-md-4 col d-flex flex-column justify-content-center">
            <div className="row mb-3 userName">{user?.result.name}</div>
            <div className="row userEmail">{user?.result.email}</div>
          </div>
        </div>
        <div className="countInfo row mb-2">
          <div className="numberPost">
            <b>{numberUserPost?.length}</b> Blogs
          </div>
        </div>
        <div className="editProfileAndUploadPost row d-flex mb-2">
          <div className="col col-md-3 col-xl-2 d-flex justify-content-center align-items-center me-md-1">
            <Link
              className="buttonEditProfile d-flex justify-content-center align-items-center link"
              to=""
              onClick={() => alert("'Will be update soon!!!'")}
            >
              <i className="far fa-edit"></i>Edit profile
            </Link>
          </div>
          <div className="col col-md-3 col-xl-2 d-flex justify-content-center align-items-center ms-md-1">
            <Link
              className="buttonUploadPost d-flex justify-content-center align-items-center link"
              to="/createpost"
            >
              <i className="fa-solid fa-plus"></i>Upload
            </Link>
          </div>
        </div>
        <div className="navbarProfile row d-flex mt-2">
          <div
            className={`col col-md-1 d-flex justify-content-center align-items-center navbarProfileItem ${
              state === "Your blog" && "isActive"
            }`}
            onClick={() => setState("Your blog")}
          >
            Your blog
          </div>
          <div
            className={`col col-md-1 d-flex justify-content-center align-items-center navbarProfileItem ${
              state === "Liked" && "isActive"
            }`}
            onClick={() => setState("Liked")}
          >
            Liked
          </div>
        </div>
      </div>
      <div className="userProfileWrapper row mt-3">
        <Posts posts={getDataPosts()} isLoading={isLoading} />
      </div>
    </div>
  );
}
