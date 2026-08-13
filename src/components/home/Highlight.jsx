import React from "react";
import "./Highlight.css";

const highlights = [
  {
    icon: "▣",
    title: "Hands-on\nExperience",
    text: "Work on real Projects\nand live Tasks"
  },
  {
    icon: "PRO",
    title: "Expert\nMentorship",
    text: "Learn From Industry\nProfessionals"
  },
  {
    icon: "✪",
    title: "Certification\nProgram",
    text: "Earn Recognized\nCertifications"
  },
  {
    icon: "↗",
    title: "Carrier\nGrowth",
    text: "Better Skills, Better\nopportunities"
  }
];

const programHighlights = [
  {
    icon: "▣",
    title: "3-6 Month Internship",
    text: "Flexible durations to match your goal"
  },
  {
    icon: "▧",
    title: "Live Client Projects",
    text: "Work on real-projects & gain experience"
  },
  {
    icon: "♙",
    title: "Weekly Mentor Sessions",
    text: "Learn and grow with expert guidance"
  },
  {
    icon: "✪",
    title: "Certificate of Completion",
    text: "Earn a recognized internship certificate"
  },
  {
    icon: "▤",
    title: "Resume & Interview Support",
    text: "Get expert help to build your career"
  },
  {
    icon: "♟",
    title: "Job Referral Opportunities",
    text: "Get noticed by top hiring partners"
  }
];

const stats = [
  {
    number: "500+",
    title: "Internship\nOpportunities",
    icon: "♟"
  },
  {
    number: "100+",
    title: "Industry\nMentors",
    icon: "♟"
  },
  {
    number: "250+",
    title: "Company\nPartners",
    icon: "▦"
  },
  {
    number: "15K+",
    title: "Students\ntrained",
    icon: "♧"
  },
  {
    number: "98%",
    title: "Intern\nSatisfaction",
    icon: "♧"
  }
];

const Highlight = () => {
  return (
    <section className="internship-section">

      <div className="internship-top">

        <div className="internship-left">

          <div className="learning-badge">
            🌟 Learn. Build. Grow.
          </div>

          <h1>
            From Learning
            <br />
            to Earning –
            <br />
            <span>We Guide You</span>
          </h1>

          <p className="intro-text">
            Join industry-focused internships and gain
            <br />
            real-world experience. Build your skills,
            <br />
            boost confidence and unlock better opportunities.
          </p>

          <div className="features">

            {highlights.map((item, index) => (
              <React.Fragment key={index}>

                <div className="feature">
                  <div className="feature-icon">
                    {item.icon}
                  </div>

                  <h3>
                    {item.title.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </h3>

                  <p>
                    {item.text.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>

                {index < highlights.length - 1 && (
                  <div className="feature-divider"></div>
                )}

              </React.Fragment>
            ))}

          </div>
        </div>

        <div className="program-card">

          <h2>
            Internship
            <br />
            <span>Program Highlights</span>
          </h2>

          <div className="program-list">

            {programHighlights.map((item, index) => (
              <div className="program-item" key={index}>

                <div className="program-icon">
                  {item.icon}
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>

              </div>
            ))}

          </div>

          <button className="apply-btn">
            Apply Now →
          </button>

        </div>

      </div>

      <div className="stats-bar">

        {stats.map((item, index) => (
          <React.Fragment key={index}>

            <div className="stat-item">

              <div className="stat-top">
                <span className="stat-icon">
                  {item.icon}
                </span>

                <span className="stat-number">
                  {item.number}
                </span>
              </div>

              <p>
                {item.title.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i === 0 && <br />}
                  </React.Fragment>
                ))}
              </p>

            </div>

            {index < stats.length - 1 && (
              <div className="stat-divider"></div>
            )}

          </React.Fragment>
        ))}

      </div>

    </section>
  );
};

export default Highlight;