import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import DetailPage from "./pages/DetailPage/DetailPage";
import CreatePost from "./pages/CreatePost/CreatePost";
import UpdatePost from "./pages/UpdatePost/UpdatePost";
import Auth from "./pages/Auth/Auth";
import Search from "./pages/Search/Search";
import Pagination from "./pages/Pagination/Pagination";
import UserProfile from "./pages/UserProfile/UserProfile";

export default function App() {
  const user = useSelector((state) => state.auth.authData);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to="/" replace={true} />}
        />
        <Route path="/" exact element={<Home />} />
        <Route path="/userprofile" exact element={<UserProfile />} />
        <Route path="/createpost" exact element={<CreatePost />} />
        <Route path="/updatepost/:postId" exact element={<UpdatePost />} />
        <Route path="/detailpost/:postId" exact element={<DetailPage />} />
        <Route path="/findbysearch" exact element={<Search />} />
        <Route path="/pagination" exact element={<Pagination />} />
      </Routes>
    </Router>
  );
}
