import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import postSlice from "./reducers/Slice/postSlice";
import authSlice from "./reducers/Slice/authSlice";
import searchSlice from "./reducers/Slice/searchSlice";
import paginationSlice from "./reducers/Slice/paginationSlice";
import PostSaga from "./reducers/Saga/postSaga";
import AuthSaga from "./reducers/Saga/authSaga";
import SearchSaga from "./reducers/Saga/searchSaga";
import PaginationSaga from "./reducers/Saga/paginationSaga";

const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    posts: postSlice,
    auth: authSlice,
    search: searchSlice,
    pagination: paginationSlice,
  },
  middleware: [saga],
});
saga.run(PostSaga);
saga.run(AuthSaga);
saga.run(SearchSaga);
saga.run(PaginationSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
