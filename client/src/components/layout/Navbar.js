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
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
