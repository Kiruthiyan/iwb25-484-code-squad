import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import "./Navigation.css";

const Navigation = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const closeMenu = () => setMenuOpen(false);

  // --- NEW: Reusable function to close menu and scroll to top ---
  const handleLinkClick = () => {
    closeMenu();
    window.scrollTo(0, 0);
  };

  const handleContactClick = (e) => {
    closeMenu();
    e.preventDefault();
    if (location.pathname === '/home' || location.pathname === '/') {
      const footer = document.getElementById('footer-contact');
      if (footer) footer.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/home#footer-contact');
    }
  };

  const handleLogout = async () => {
    closeMenu();
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        {/* --- MODIFIED: Added onClick handler --- */}
        <Link to="/home" className="navbar-logo" onClick={handleLinkClick}>
          NexusLinK
        </Link>
      </div>

      {/* Center: Menu Links */}
      <ul className={isMenuOpen ? "nav-list open" : "nav-list"}>
        <li className="nav-item">
          <Link to="/home" onClick={handleLinkClick}>Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/advertisements" onClick={handleLinkClick}>Companies</Link>
        </li>
        <li className="nav-item">
          <Link to="/startup" onClick={handleLinkClick}>Startups</Link>
        </li>
        <li className="nav-item">
          <Link to="/talent" onClick={handleLinkClick}>Job Seekers</Link>
        </li>
       {/* +++ THIS IS THE NEW CODE +++ */}
        <li className="nav-item">
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
        </li>
      </ul>

      {/* Right: Login/Signup OR Logout */}
      <div className="navbar-right">
        {user ? (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        ) : (
          <>
            {/* --- MODIFIED: Added onClick handler --- */}
            <Link to="/login" className="auth-link" onClick={handleLinkClick}>Login</Link>
            <span className="divider">|</span>
            {/* --- MODIFIED: Link to /login and added onClick handler --- */}
            <Link to="/login" className="auth-link" onClick={handleLinkClick}>Signup</Link>
          </>
        )}
      </div>

      {/* Hamburger (only for mobile) */}
      <div 
        className={isMenuOpen ? "hamburger-menu open" : "hamburger-menu"} 
        onClick={toggleMenu}
      >
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>
    </nav>
  );
};

export default Navigation;