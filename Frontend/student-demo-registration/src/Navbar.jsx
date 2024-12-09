import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Register</Link>
      </li>
      <li>
        <Link to="/students">Manage Students</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
