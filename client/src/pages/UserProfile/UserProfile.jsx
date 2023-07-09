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
  const [state, setState] = useState("Your post");

  const isLoading = useSelector((state) => state.posts.isLoading);

  const user = JSON.parse(localStorage.getItem("profile"));
  const posts = useSelector((state) => state.posts.posts);
  const numberUserPost = posts.filter(
    (post) => user?.result?._id === post.creator
  );

  const getDataPosts = () => {
    var userPosts;
    if (state === "Your post") {
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
    <div className="userProfile">
      <div className="userProfileWrapper">
        <div className="userProfileInfo">
          <div className="userImg">
            <Avatar
              className={classes.userAvata}
              alt=""
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0).toUpperCase()}
            </Avatar>
          </div>
          <div className="userInfo">
            <div className="userName">{user?.result.name}</div>
            <div className="userEmail">{user?.result.email}</div>
          </div>
        </div>
        <div className="countInfo">
          <div className="numberPost">
            <b>{numberUserPost?.length}</b> posts
          </div>
        </div>
        <div className="editProfileAndUploadPost">
          <button
            className="buttonEditProfile"
            onClick={() => alert("'Will be update soon!!!'")}
          >
            <i className="far fa-edit"></i> Edit profile
          </button>
          <Link className="buttonUploadPost" to="/createpost">
            <i className="fa-solid fa-plus"></i> Upload
          </Link>
        </div>
        <div className="navbarProfile">
          <div
            className={`navbarProfileItem ${
              state === "Your post" && "isActive"
            } link`}
            onClick={() => setState("Your post")}
          >
            Your post
          </div>
          <div
            className={`navbarProfileItem ${
              state === "Liked" && "isActive"
            } link`}
            onClick={() => setState("Liked")}
          >
            Liked
          </div>
        </div>
      </div>
      <div className="userProfileWrapper">
        <Posts posts={getDataPosts()} isLoading={isLoading} />
      </div>
    </div>
  );
}
