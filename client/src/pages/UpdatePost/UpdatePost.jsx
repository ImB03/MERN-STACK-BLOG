import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./updatePost.css";
import { ACTION_UPDATE_POST } from "../../reducers/Slice/postSlice";
import Image from "../../components/Image/Image";

export default function CreatePost() {
  const navigate = useNavigate();
  const params = useParams().postId;

  const dispatch = useDispatch();
  const dataPost = useSelector((state) => state.posts.post);
  const user = JSON.parse(localStorage.getItem("profile"));

  const [infoUpdatePost, setInfoUpdatePost] = useState({
    title: "",
    description: "",
    tags: [],
    selectedFile: "",
  });

  useEffect(() => {
    setInfoUpdatePost(dataPost);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      ACTION_UPDATE_POST({
        params,
        infoUpdatePost: { ...infoUpdatePost, name: user?.result?.name },
      })
    );
  };

  const handleChange = (e) => {
    setInfoUpdatePost({ ...infoUpdatePost, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setInfoUpdatePost({
      title: "",
      description: "",
      tags: [],
      selectedFile: "",
    });
  };

  return (
    // <div className="createPost">
    //   {infoUpdatePost.selectedFile && (
    //     <img
    //       className="createPostImg"
    //       src={infoUpdatePost.selectedFile}
    //       alt=""
    //     />
    //   )}
    //   <form className="createPostForm" onSubmit={handleSubmit}>
    //     <div className="createPostFormGroup">
    //       <FileBase
    //         className="createPostSubmit"
    //         type="file"
    //         name="selectedFile"
    //         onDone={({ base64 }) =>
    //           setInfoUpdatePost({ ...infoUpdatePost, selectedFile: base64 })
    //         }
    //         style={{ display: "none" }}
    //       />
    //       <input
    //         type="text"
    //         placeholder="Title"
    //         name="title"
    //         value={infoUpdatePost.title}
    //         onChange={handleChange}
    //         className="createPostInput"
    //         autoFocus={true}
    //       />
    //       <input
    //         type="text"
    //         name="tags"
    //         value={infoUpdatePost.tags}
    //         onChange={handleChange}
    //         placeholder="Tags"
    //         className="createPostInput"
    //         autoFocus={true}
    //       />
    //     </div>
    //     <div className="createPostFormGroup">
    //       <textarea
    //         type="text"
    //         rows="4"
    //         cols="5"
    //         name="description"
    //         value={infoUpdatePost.description}
    //         onChange={handleChange}
    //         placeholder="Tell your story..."
    //         className="createPostInput createPostText"
    //       ></textarea>
    //     </div>
    //     <button className="createPostSubmit" type="submit">
    //       Publish
    //     </button>
    //     <button className="createPostSubmit" onClick={HandleClear}>
    //       Clear All
    //     </button>
    //   </form>
    // </div>
    <div className="updatePost">
      <div className="updatePostWrapper">
        <div className="updatePostForm">
          <Image
            className="updatePostImg"
            imageUrl={infoUpdatePost.selectedFile}
          />
          <div className="updatePostFormGroup">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={infoUpdatePost.title}
              onChange={handleChange}
              className="updatePostInput"
              autoFocus={true}
            />
            <input
              type="text"
              name="tags"
              value={infoUpdatePost.tags}
              onChange={(e) => {
                setInfoUpdatePost({
                  ...infoUpdatePost,
                  tags: e.target.value.split(","),
                });
              }}
              placeholder="Tags"
              className="updatePostInput"
              autoFocus={true}
            />
            <textarea
              type="text"
              rows="4"
              cols="5"
              name="description"
              value={infoUpdatePost.description}
              onChange={handleChange}
              placeholder="Tell your story..."
              className="updatePostInput updatePostText"
            />
            <FileBase
              className="updatePostInput"
              type="file"
              name="selectedFile"
              onDone={({ base64 }) =>
                setInfoUpdatePost({ ...infoUpdatePost, selectedFile: base64 })
              }
              style={{ display: "none" }}
            />
            <div className="userAction">
              <button
                className="updatePostSubmit"
                type="submit"
                onClick={handleClear}
              >
                Clear All
              </button>
              <button
                className="updatePostSubmit"
                type="submit"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
