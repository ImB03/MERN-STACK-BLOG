import { call, put, takeEvery } from "redux-saga/effects";

import { ACTION_PAGINATION, PAGINATION } from "../Slice/paginationSlice";
import { fetchPostsByPagination } from "../../api";

// PAGINATION
function* getPostsByPagination(action) {
  try {
    const posts = yield call(() => fetchPostsByPagination(action.payload));
    yield put(PAGINATION(posts.data));
  } catch (error) {
    console.log(error);
  }
}

function* PaginationSaga() {
  yield takeEvery(ACTION_PAGINATION, getPostsByPagination);
}

export default PaginationSaga;
