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
    <div className="createPost container d-flex justify-content-center mt-5 align-items-center">
      <div
        className="row col d-flex flex-column-reverse flex-md-row justify-content-center container"
      >
        <div className="row-5 col-md-5 mb-4 mb-md-0">
          <Image className="createPostImg" imageUrl={postData.selectedFile} />
        </div>
        <div className="row-7 col-md-7 mb-4 mb-md-0 d-flex flex-column justify-content-between">
          <div className="row">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={postData.title}
              onChange={handleChange}
              className="mb-2 createPostInput"
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
              className="mb-2 createPostInput"
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
              className="mb-2 createPostInput createPostText"
            />
            <FileBase
              className="mb-2 createPostInput"
              type="file"
              name="selectedFile"
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
              style={{ display: "none" }}
            />
          </div>
          <div className="row mt-2 d-flex justify-content-md-end">
            <button
              className="col me-2 createPostSubmit"
              type="submit"
              onClick={handleClear}
            >
              Clear All
            </button>
            <button
              className="col ms-2 createPostSubmit"
              type="submit"
              onClick={handleSubmit}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
