import React from "react";
import "./CTA.css";

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-icon">
        🏅
      </div>

      <div className="cta-content">
        <h2>Ready to Start Your Journey?</h2>

        <p>
          Join Steps Infotech and take the first step towards a successful IT career.
        </p>
      </div>

      <button className="cta-button">
        Apply for Internship →
      </button>
    </section>
  );
};

export default CTA;
