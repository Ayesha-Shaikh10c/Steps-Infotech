import React from "react";
import "./hero.css";

const Hero = () => {
  return (
    <section className="portfolio-hero">
      
      {/* Portfolio Heading */}
      <h1 className="portfolio-title">
        OUR PORTFOLIO
      </h1>

      {/* Hero Banner */}
      <div className="portfolio-hero-container">

        {/* Left Content */}
        <div className="portfolio-hero-content">

          <h2>
            SOLUTIONS WE BUILT.
            <br />
            <span>SUCCESS WE DELIVER.</span>
          </h2>

          <div className="portfolio-hero-buttons">
            <button>
              View Case Studies →
            </button>

            <button>
              Start Your Project →
            </button>
          </div>

          <p>
            Explore our innovative projects that showcase our expertise,
            <br />
            creativity and commitment to deliver exceptional results.
          </p>

        </div>

        {/* Right Image */}
        <div className="portfolio-hero-image">
          <img
            src="/images/portfolio-laptop.jpg"
            alt="Portfolio project"
          />
        </div>

      </div>

    </section>
  );
};

export default Hero;