import React from "react";

import "./header.css";

export default function Header() {
  return (
    <div className="header">
        <div className="row d-flex flex-column justify-content-center align-items-center">
          <div className="col d-flex justify-content-center align-items-center">
              <span className="headerTitleSm position-absolute">React</span>
              <span className="headerTitleLg position-absolute">BLOG</span>
          </div>
          <div className="col">
            <img
              className="headerImg"
              src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            />
          </div>
        </div>
    </div>
  );
}
