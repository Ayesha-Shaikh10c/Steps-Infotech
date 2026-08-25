import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">
          <div className="footer-logo">
            <div className="footer-logo-icon">S</div>

            <div>
              <h2>STEPS</h2>
              <span>INFOTECH</span>
            </div>
          </div>

          <p>
            Building secure, scalable and innovative
            <br />
            software solutions using modern technologies
          </p>

          <div className="footer-social">
            <span>f</span>
            <span>in</span>
            <span>𝕏</span>
            <span>◎</span>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="#">Home</a>
          <a href="#">About us</a>
          <a href="#">Services</a>
          <a href="#">Solution</a>
          <a href="#">Technologies</a>
        </div>

        <div className="footer-services">
          <h3>Our Services</h3>

          <a href="#">Web Development</a>
          <a href="#">Mobile App Development</a>
          <a href="#">Cloud Solutions</a>
          <a href="#">Cyber Security</a>
          <a href="#">Digital Marketing</a>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>

          <div className="contact-item">
            <span>⌖</span>
            <p>
              123, Tarateoad Heights, Kondhwa kh,
              <br />
              Pune-411048, India
            </p>
          </div>

          <div className="contact-item">
            <span>☎</span>
            <p>+91 9876543210</p>
          </div>

          <div className="contact-item">
            <span>✉</span>
            <p>stepsinfotech@org.com</p>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Steps Infotech. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;