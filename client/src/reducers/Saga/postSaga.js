import { call, put, takeEvery } from "redux-saga/effects";

import {
  ACTION_FETCH_ALL_POSTS,
  ACTION_FETCH_ONE_POST,
  ACTION_CREATE_POST,
  ACTION_UPDATE_POST,
  ACTION_DELETE_POST,
  ACTION_LIKE_POST,
  ACTION_COMMENT_POST,
  FETCH_ALL_POSTS,
  FETCH_ONE_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  COMMENT_POST,
} from "../Slice/postSlice";
import {
  fetchAllPosts,
  fetchOnePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../../api";

// FETCH ALL POSTS
function* FetchAllPosts(action) {
  try {
    const posts = yield call(() => fetchAllPosts());
    yield put(FETCH_ALL_POSTS(posts.data));
  } catch (error) {
    console.log(error);
  }
}

// FETCH ONE POST
function* FetchOnePost(action) {
  try {
    const post = yield call(() => fetchOnePost(action.payload));
    yield put(FETCH_ONE_POST(post.data));
  } catch (error) {
    console.log(error);
  }
}

// CREATE POST
function* CreatePost(action) {
  try {
    const infoNewPost = yield call(() => createPost(action.payload));
    yield put(CREATE_POST(infoNewPost.data));
  } catch (error) {
    console.log(error);
  }
}

// UPDATE POST
function* UpdatePost(action) {
  try {
    const infoUpdatePost = yield call(() =>
      updatePost(action.payload.params, action.payload.infoUpdatePost)
    );
    yield put(
      UPDATE_POST({
        infoUpdatePost: infoUpdatePost.data,
        postId: action.payload.params,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

// DELETE A POST
function* DeletePost(action) {
  try {
    yield call(() => deletePost(action.payload));
    yield put(DELETE_POST(action.payload));
  } catch (error) {
    console.log(error);
  }
}

// LIKE A POST
function* LikePost(action) {
  try {
    const likedPost = yield call(() => likePost(action.payload));
    yield put(LIKE_POST({ likedPost: likedPost.data, postId: action.payload }));
  } catch (error) {
    console.log(error);
  }
}

// COMMENT
function* CommentPost(action) {
  try {
    const dataPost = yield call(() =>
      commentPost(action.payload.dataComment, action.payload.postId)
    );

    yield put(COMMENT_POST(dataPost.data));
  } catch (error) {
    console.log(error);
  }
}

function* PostSaga() {
  yield takeEvery(ACTION_FETCH_ALL_POSTS, FetchAllPosts);
  yield takeEvery(ACTION_FETCH_ONE_POST, FetchOnePost);
  yield takeEvery(ACTION_CREATE_POST, CreatePost);
  yield takeEvery(ACTION_UPDATE_POST, UpdatePost);
  yield takeEvery(ACTION_DELETE_POST, DeletePost);
  yield takeEvery(ACTION_LIKE_POST, LikePost);
  yield takeEvery(ACTION_COMMENT_POST, CommentPost);
}

export default PostSaga;
