import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-light">
      <h1>
        <Link to="/">
          <i className="fas fa-utensils"></i> Mise-en-Place
        </Link>
      </h1>
      <ul>
        <li>
          <a href="!#">Register</a>
        </li>
        <li>
          <a href="!#">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
