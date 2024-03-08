import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header position-sticky">
      <ul className="nav nav-pills">
        <li className="nav-item ">
          <Link className="nav-link" to="/">
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">
            Products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
