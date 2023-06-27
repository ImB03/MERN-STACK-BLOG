import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./detailPage.css";
import DetailPost from "../../components/PostDetail/PostDetail";
import { ACTION_FETCH_ONE_POST } from "../../reducers/Slice/postSlice";

export default function DetailPage() {
  const dispatch = useDispatch();
  const params = useParams().postId;
  const post = useSelector((state) => state.posts.post);
  const isLoading = useSelector((state) => state.posts.isLoading);

  useEffect(() => {
    dispatch(ACTION_FETCH_ONE_POST(params));
  }, [params]);

  return (
    <div className="detailpage">
      <DetailPost isLoading={isLoading} />
    </div>
  );
}
