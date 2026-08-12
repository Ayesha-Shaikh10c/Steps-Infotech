import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">

      {/* LEFT CONTENT */}
      <div className="hero-content">

        <h1>
          Top In-demand
          <br />
          Internship In
          <br />
          <span>2026</span>
        </h1>

        <p className="hero-description">
          Join hands with Steps Infotech for the
          <br />
          latest internship opportunities and tech
          <br />
          career updates.
        </p>

        {/* BUTTONS */}
        <div className="hero-buttons">
          <button className="explore-btn">
            🔍 Explore Internships →
          </button>

          <button className="learn-btn">
            Learn More →
          </button>
        </div>

        {/* STATS */}
        <div className="stats">

          <div className="stat">
            <h3>500+</h3>
            <p>Internship<br />opportunities</p>
          </div>

          <div className="divider"></div>

          <div className="stat">
            <h3>♟ 10K+</h3>
            <p>Happy<br />Interns</p>
          </div>

          <div className="divider"></div>

          <div className="stat">
            <h3>▦ 100+</h3>
            <p>Partner<br />Companies</p>
          </div>

          <div className="divider"></div>

          <div className="stat">
            <h3>♙ 90%</h3>
            <p>Intern<br />Satisfaction</p>
          </div>

        </div>

        {/* TRUSTED BY */}
        <p className="trusted-title">Trusted By</p>

        <div className="trusted-box">
          <span>🌈 Google</span>
          <span>▣ Microsoft</span>
          <span>▣ AWS</span>
          <span>◻ Oracle</span>
          <span>▣ LinkedIn</span>
        </div>

      </div>

      {/* RIGHT IMAGE */}
      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80"
          alt="Modern Office"
        />
      </div>

    </section>
  );
};

export default Hero;