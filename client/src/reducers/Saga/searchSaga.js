import { call, put, takeEvery } from "redux-saga/effects";

import { ACTION_SEARCH_POSTS, SEARCH_POSTS } from "../Slice/searchSlice";
import { fetchPostsBySearch } from "../../api";

// SEARCH
function* GetPostsBySearch(action) {
  try {
    const posts = yield call(() => fetchPostsBySearch(action.payload));
    yield put(SEARCH_POSTS(posts.data));
  } catch (error) {
    console.log(error);
  }
}

function* SearchSaga() {
  yield takeEvery(ACTION_SEARCH_POSTS, GetPostsBySearch);
}

export default SearchSaga;
