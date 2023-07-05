import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import "./navbar.css";
import { ACTION_LOGOUT } from "../../reducers/Slice/authSlice";
import { ACTION_SEARCH_POSTS } from "../../reducers/Slice/searchSlice";
import { Avatar } from "@material-ui/core";
import useStyles from "./styles";

export default function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const itemsDropdown = [
    { id: 1, name: "Profile", to: "/userprofile" },
    { id: 2, name: "Logout", to: "/auth" },
  ];

  const handleLogout = (e) => {
    dispatch(ACTION_LOGOUT());
    setUser(null);
    navigate("/auth");
  };

  useEffect(() => {
    const token = user?.token;

    console.log("token:", token);

    if (token) {
      const decodedToken = decode(token);

      console.log("decodedToken:", decodedToken);

      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();

      console.log("decodedToken.exp * 1000:", decodedToken.exp * 1000);
      console.log("new Date().getTime():", new Date().getTime());
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user]);

  const searchPost = () => {
    if (
      search.trim()
      //  || tags
    ) {
      dispatch(ACTION_SEARCH_POSTS(search));
      navigate(`/findbysearch?searchQuery=${search || "none"}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    // <div className="navbar">
    //   <div className="navbarLeft">        <div className="navbarList">
    //       <div className="search-box">
    //         <input
    //           type="search"
    //           name="search"
    //           onKeyDown={handleKeyPress}
    //           placeholder="Search anything"
    //           value={search}
    //           className="search-input"
    //           onChange={(e) => setSearch(e.target.value)}
    //         />
    //         <div onClick={searchPost} className="search-btn">
    //           <i className="fas fa-search"></i>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="navbarCenter">
    //     <ul className="navbarList">
    //       <li className="navbarListItem">
    //         <NavLink
    //           className={({ isActive }) =>
    //             isActive ? "isActive link" : "link"
    //           }
    //           to="/"
    //         >
    //           HOME
    //         </NavLink>
    //       </li>
    //       {user && (
    //         <li className="navbarListItem">
    //           <NavLink
    //             className={({ isActive }) =>
    //               isActive ? "isActive link" : "link"
    //             }
    //             to="/createpost"
    //           >
    //             CREATE POST
    //           </NavLink>
    //         </li>
    //       )}
    //     </ul>
    //   </div>

    //   <div className="navbarRight">
    //     <div className="navbarList">
    //       {user && (
    //         <div className="navbarListItem">
    //           <Avatar
    //             className={classes.userAvata}
    //             alt=""
    //             src={user?.result.imageUrl}
    //             onClick={() => setShowDropdown(!showDropdown)}
    //           >
    //             {user?.result.name.charAt(0).toUpperCase()}
    //           </Avatar>
    //         </div>
    //       )}
    //       {showDropdown && (
    //         <div className="navbarListItem">
    //           <div className="navbarDropdown">
    //             {itemsDropdown.map((item) => (
    //               <NavLink
    //                 key={item.id}
    //                 to={item.to}
    //                 className="navbarItemDropdown link"
    //                 onClick={() => {
    //                   setShowDropdown(false);
    //                   if (user && item.name === "Logout") {
    //                     handleLogout();
    //                   }
    //                 }}
    //               >
    //                 {item.name}
    //               </NavLink>
    //             ))}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //     {!user && location.pathname !== "/auth" ? (
    //       <div className="navbarList">
    //         <div className="navbarListItem">
    //           <NavLink className="link" to="/auth">
    //             LOGIN
    //           </NavLink>
    //         </div>
    //       </div>
    //     ) : null}
    //   </div>
    // </div>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>  );
}
