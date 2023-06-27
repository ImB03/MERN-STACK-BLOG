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
    <div className="navbar">
      <div className="navbarLeft">
        <div className="navbarList">
          <Link to="/">
            <img
              className="navbarLogo"
              src="data:image/png;base64,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"
              alt=""
              style={{ height: "50px", margin: "20px 20px" }}
            />
          </Link>
        </div>
        <div className="navbarList">
          {/* <ChipInput
            style={{ margin: "10px 0" }}
            value={tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
            label="Search Tags"
            variant="outlined"
          /> */}
          {/* <input
            type="search"
            name="search"
            id=""
            onKeyDown={handleKeyPress}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPost} className="">
            Search
          </button> */}
          <div className="search-box">
            <input
              type="search"
              name="search"
              onKeyDown={handleKeyPress}
              placeholder="Search anything"
              value={search}
              className="search-input"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div onClick={searchPost} className="search-btn">
              <i className="fas fa-search"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="navbarCenter">
        <ul className="navbarList">
          <li className="navbarListItem">
            <NavLink
              className={({ isActive }) =>
                isActive ? "isActive link" : "link"
              }
              to="/"
            >
              HOME
            </NavLink>
          </li>
          {user && (
            <li className="navbarListItem">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "isActive link" : "link"
                }
                to="/createpost"
              >
                CREATE POST
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="navbarRight">
        <div className="navbarList">
          {user && (
            <div className="navbarListItem">
              <Avatar
                className={classes.userAvata}
                alt=""
                src={user?.result.imageUrl}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user?.result.name.charAt(0).toUpperCase()}
              </Avatar>
            </div>
          )}
          {showDropdown && (
            <div className="navbarListItem">
              <div className="navbarDropdown">
                {itemsDropdown.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    className="navbarItemDropdown link"
                    onClick={() => {
                      setShowDropdown(false);
                      if (user && item.name === "Logout") {
                        handleLogout();
                      }
                    }}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
        {!user && location.pathname !== "/auth" ? (
          <div className="navbarList">
            <div className="navbarListItem">
              <NavLink className="link" to="/auth">
                LOGIN
              </NavLink>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
