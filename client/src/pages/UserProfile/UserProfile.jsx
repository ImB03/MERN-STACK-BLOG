import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";

import styles from "./userProfile.module.scss";
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
    <div className={styles.userProfile}>
      <div className={styles.userProfileWrapper}>
        <div className={styles.userProfileInfo}>
          <div className={styles.userImg}>
            <Avatar
              className={classes.userAvata}
              alt=""
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0).toUpperCase()}
            </Avatar>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user?.result.name}</div>
            <div className={styles.userEmail}>{user?.result.email}</div>
          </div>
        </div>
        <div className={styles.countInfo}>
          <div className={styles.numberPost}>
            <b>{numberUserPost?.length}</b> posts
          </div>
        </div>
        <div className={styles.editProfileAndUploadPost}>
          <button
            className={styles.buttonEditProfile}
            onClick={() => alert("'Will be update soon!!!'")}
          >
            <i className="far fa-edit"></i> Edit profile
          </button>
          <Link className={styles.buttonUploadPost} to="/createpost">
            <i className="fa-solid fa-plus"></i> Upload
          </Link>
        </div>
        <div className={styles.navbarProfile}>
          <div
            className={`${styles.navbarProfileItem} ${
              state === "Your post" && styles.isActive
            } link`}
            onClick={() => setState("Your post")}
          >
            Your post
          </div>
          <div
            className={`${styles.navbarProfileItem} ${
              state === "Liked" && styles.isActive
            } link`}
            onClick={() => setState("Liked")}
          >
            Liked
          </div>
        </div>
      </div>
      <div className={styles.userProfileWrapper}>
        <Posts posts={getDataPosts()} isLoading={isLoading} />
      </div>
    </div>
  );
}
