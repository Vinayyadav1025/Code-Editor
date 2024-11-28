import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h3>CodeEditor</h3>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/problems">Problems</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
