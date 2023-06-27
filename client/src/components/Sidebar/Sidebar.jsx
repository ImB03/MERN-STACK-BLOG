import React from "react";
import { useSelector } from "react-redux";

import "./sidebar.css";
import Paginate from "../Pagination/Pagination.jsx";

export default function Sidebar() {
  const isLoading = useSelector((state) => state.posts.isLoading);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <Paginate />
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsEiSPA_ugNLTHaJzZNEJuZ11VHyTW7snsIg&usqp=CAU"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          enim beatae amet est tempore odio aliquid autem explicabo cumque eius
          ea corporis, eveniet, quod debitis minima totam accusantium. Aut,
          dicta?
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
}
