import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaUsers,
  FaBriefcase,
  FaAward,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import "./Testimonials.css";

const testimonials = [
  {
    name: "Roblox",
    company: "Fin Crop Solutions",
    text: "Great place to learn and grow with cutting-edge technologies and projects.",
  },
  {
    name: "Priya Sharma",
    company: "IT Manager - Health Plus",
    text: "Good work-life balance with certified mentors and positive work environment.",
  },
  {
    name: "Amit Patel",
    company: "Product Head - Shopideas",
    text: "Excellent opportunities for career growth and advancement.",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img
            src="https://via.placeholder.com/45"
            alt="logo"
          />
          <div>
            <h2>STEPS</h2>
            <span>INFOTECH</span>
          </div>
        </div>

        <nav>
          <a href="/">HOME</a>
          <a href="/">ABOUT</a>
          <a href="/">SERVICES</a>
          <a href="/">SOLUTIONS</a>
          <a href="/">TECHNOLOGIES</a>
          <a href="/">CAREERS</a>
          <a href="/">BLOG</a>
        </nav>

        <button>GET IN TOUCH</button>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="overlay">
          <h1>WHAT OUR CLIENTS SAY ABOUT US</h1>
          <p>
            We have partnered with businesses nationwide and built long-term
            relationships.
          </p>
        </div>
      </section>

      {/* Heading */}
      <section className="heading">
        <h4>CLIENT TESTIMONIALS</h4>
        <h2>Trusted By Our Businesses Across Industries</h2>
        <p>
          Hear from our clients about their experience working with Steps
          Infotech
        </p>
      </section>

      {/* Testimonials */}
      <section className="testimonial-section">
        <button className="arrow">
          <FaChevronLeft />
        </button>

        <div className="cards">
          {testimonials.map((item, index) => (
            <div className="card" key={index}>
              <FaQuoteLeft className="quote" />

              <p>{item.text}</p>

              <div className="profile">
                <img
                  src="https://via.placeholder.com/60"
                  alt={item.name}
                />

                <div>
                  <h4>{item.name}</h4>
                  <span>{item.company}</span>
                </div>
              </div>

              <div className="stars">★★★★★</div>
            </div>
          ))}
        </div>

        <button className="arrow">
          <FaChevronRight />
        </button>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat">
          <FaUsers />
          <h2>150+</h2>
          <p>Happy Clients</p>
        </div>

        <div className="stat">
          <FaBriefcase />
          <h2>200+</h2>
          <p>Projects Delivered</p>
        </div>

        <div className="stat">
          <FaAward />
          <h2>98%</h2>
          <p>Client Satisfaction</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-col">
          <h3>STEPS INFOTECH</h3>
          <p>
            Building scalable, sustainable and innovative software solutions
            using modern technologies.
          </p>

          <div className="social">
            <FaFacebookF />
            <FaLinkedinIn />
            <FaInstagram />
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Services</a>
          <a href="/">Technologies</a>
        </div>

        <div className="footer-col">
          <h3>Services</h3>
          <a href="/">Web Development</a>
          <a href="/">Mobile App</a>
          <a href="/">Cloud</a>
          <a href="/">Digital Marketing</a>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>

          <p>
            <FaPhoneAlt /> +91 9876543210
          </p>

          <p>
            <FaEnvelope /> support@example.com
          </p>
        </div>
      </footer>
    </div>
  );
}