import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";

import "./createPost.css";
import { ACTION_CREATE_POST } from "../../reducers/Slice/postSlice";
import { useNavigate } from "react-router-dom";
import Image from "../../components/Image/Image";

export default function CreatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    tags: [],
    selectedFile: "",
  });
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    dispatch(ACTION_CREATE_POST({ ...postData, name: user?.result?.name }));
  };

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setPostData({
      title: "",
      description: "",
      tags: [],
      selectedFile: "",
    });
  };

  return (
    <div className="createPost">
      <div className="createPostWrapper">
        <div className="createPostForm">
          <Image className="createPostImg" imageUrl={postData.selectedFile} />
          <div className="createPostFormGroup">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={postData.title}
              onChange={handleChange}
              className="createPostInput"
              autoFocus={true}
            />
            <input
              type="text"
              name="tags"
              value={postData.tags}
              onChange={(e) => {
                setPostData({
                  ...postData,
                  tags: e.target.value.split(","),
                });
              }}
              placeholder="Tags"
              className="createPostInput"
              autoFocus={true}
            />
            <textarea
              type="text"
              rows="4"
              cols="5"
              name="description"
              value={postData.description}
              onChange={handleChange}
              placeholder="Tell your story..."
              className="createPostInput createPostText"
            />
            <FileBase
              className="createPostInput"
              type="file"
              name="selectedFile"
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
              style={{ display: "none" }}
            />
            <div className="userAction">
              <button
                className="createPostSubmit"
                type="submit"
                onClick={handleClear}
              >
                Clear All
              </button>
              <button
                className="createPostSubmit"
                type="submit"
                onClick={handleSubmit}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
