import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <Link to="/" className="link">
        <p>Library</p>
      </Link>
    </div>
  );
};

export default Navbar;
