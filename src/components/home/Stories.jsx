import React from "react";
import "./Stories.css";

const Stories = () => {
  const stories = [
    {
      text: "Steps Infotech helped me gain practical skills and confidence. The live projects and mentor support are excellent!",
      name: "Dayyan Kazi",
      role: "Web Developer Intern",
    },
    {
      text: "I learn so much during my internship. The environment is professional and supportive. Highly recommended!",
      name: "Sayma Shaikh",
      role: "UI/UX Design Intern",
    },
    {
      text: "Greate place to start your career in It. The training, projects and placement are outstanding",
      name: "Mohid Ali",
      role: "AI/ML Intern",
    }
  ];

  return (
    <section className="success-section">
      <div className="success-heading">
        <p>What students say</p>

        <h2>
          Success <span>Stories</span>
        </h2>

        <p className="success-description">
          Our student success is our biggest achievement.
          <br />
          Here’s what they have to say about their journey with Steps Infotech.
        </p>
      </div>

      <div className="stories-container">
        {stories.map((story, index) => (
          <div className="story-card" key={index}>

            <p className="story-text">
              {story.text}
            </p>

            <div className="student-info">
              <img src={story.image} alt={story.name} />

              <div>
                <h3>{story.name}</h3>
                <p>{story.role}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Stories;