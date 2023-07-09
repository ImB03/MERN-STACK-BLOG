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
  const [collapse, setCollapse] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const itemsDropdown = [
    { id: 1, name: "YOUR PROFILE", to: "/userprofile" },
    { id: 2, name: "LOGOUT", to: "/auth" },
  ];

  const handleLogout = (e) => {
    dispatch(ACTION_LOGOUT());
    setUser(null);
    navigate("/auth");
  };

  useEffect(() => {
    if (location.pathname === "/auth") {
      setShowDropdown(false);
    }

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
  }, [location]);

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
    <div className="nav d-flex justify-content-center align-items-center position-sticky">
      <div className="container-fluid">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col d-flex justify-content-start align-items-center d-sm-none">
            <Link to="/">
              <img
                className="navbarLogo"
                src="https://www.freepnglogos.com/uploads/nature-png/nature-rays-logo-inspiration-17.png"
                alt=""
              />
            </Link>
          </div>
          <div className="col d-none d-sm-flex justify-content-start align-items-center position-relative">
            <div className="search-box">
              <input
                type="search"
                className="search-txt"
                name="search"
                value={search}
                placeholder="Search anything"
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div onClick={searchPost} className="search-btn">
                <i className="fas fa-search" name="search-outline"></i>
              </div>
            </div>
          </div>
          <div className="col d-none d-lg-flex justify-content-center align-items-center">
            <NavLink
              className={({ isActive }) =>
                isActive ? "isActive link m-3" : "link m-3"
              }
              to="/"
            >
              HOME
            </NavLink>

            {user && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "isActive link" : "link"
                }
                to="/createpost"
              >
                CREATE BLOG
              </NavLink>
            )}
          </div>
          <div className="col d-flex justify-content-end align-items-center d-lg-none">
            <div
              className="navbarIconBar d-flex justify-content-center align-items-center"
              onClick={() => setCollapse(!collapse)}
            >
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="col d-none d-lg-flex justify-content-end align-items-center position-relative">
            {user && (
              <Avatar
                className={classes.userAvata}
                alt=""
                src={user?.result.imageUrl}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user?.result.name.charAt(0).toUpperCase()}
              </Avatar>
            )}
            {showDropdown && (
              <div className="navbarDropdown container position-absolute">
                <div className="row p-2 d-flex flex-column justify-content-start align-items-center">
                  {itemsDropdown.map((item) => (
                    <div key={item.id} className="col p-2 navbarItemDropdown">
                      <Link
                        to={item.to}
                        className="link"
                        onClick={() => {
                          setShowDropdown(false);
                          if (user && item.name === "LOGOUT") {
                            handleLogout();
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!user && location.pathname !== "/auth" ? (
              <Link className="link" to="/auth">
                LOGIN
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className={`navbarCollapse p-5 position-absolute ${
          !collapse ? "d-none" : ""
        } d-lg-none`}
      >
        <div className="container-fluid">
          <div className="row d-flex flex-column">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `col p-2 navbarCollapseItem ${isActive && "isActive"} link`
              }
            >
              HOME
            </NavLink>
            {user && (
              <NavLink
                to="/createpost"
                className={({ isActive }) =>
                  `col p-2 navbarCollapseItem ${isActive && "isActive"} link`
                }
              >
                CREATE BLOG
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/userprofile"
                className={({ isActive }) =>
                  `col p-2 navbarCollapseItem ${isActive && "isActive"} link`
                }
              >
                YOUR PROFILE
              </NavLink>
            )}
            <div className="col p-2 navbarCollapseItem d-flex d-sm-none">
              <input
                className="form-control me-2"
                type="search"
                name="search"
                value={search}
                placeholder="Search anything"
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search"
              />
              <button
                onClick={searchPost}
                className="btn btn-outline-success"
                type="submit"
              >
                Search
              </button>
            </div>
            {location.pathname !== "/auth" && (
              <div className="col">
                <hr />
              </div>
            )}
            {!user && location.pathname !== "/auth" ? (
              <Link
                onClick={() => setCollapse(false)}
                to="/auth"
                className="col p-2 navbarCollapseItem link"
              >
                LOGIN
              </Link>
            ) : null}
            {user && (
              <Link
                to="/auth"
                className="col p-2 navbarCollapseItem link"
                onClick={() => {
                  setCollapse(false);
                  setShowDropdown(false);
                  handleLogout();
                }}
              >
                LOGOUT
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
