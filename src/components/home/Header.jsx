import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="site-header">

      <div className="top-bar">
        <div className="top-left">
          <span>📞 +91 7744744744</span>
          <span>✉ stepinfotech@org.com</span>
          <span>📍 Pune, Maharashtra, India</span>
        </div>

        <div className="social-icons">
          <span>f</span>
          <span>in</span>
          <span>𝕏</span>
          <span>◎</span>
        </div>
      </div>

      <div className="navbar">

        <div className="logo">
          <div className="logo-icon">S</div>

          <div className="logo-text">
            <h2>STEPS</h2>
            <span>INFOTECH</span>
          </div>
        </div>

        <nav className="nav-menu">
          <a href="#">HOME</a>
          <a href="#">ABOUT</a>
          <a href="#">SERVICES</a>
          <Link to="/solutions">SOLUTIONS</Link>
          <a href="#">TECHNOLOGIES</a>
          <a href="#">PORTFOLIO</a>
          <a href="#">TESTIMONIALS</a>
          <a href="#">CAREERS</a>
          <a href="#">BLOG</a>
        </nav>

        <button className="contact-btn">
          GET IN TOUCH
        </button>

      </div>

    </header>
  );
};

export default Header;