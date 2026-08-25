import React from "react";
import "./Topics.css";

const topics = [
  {
    icon: "🌐",
    title: "Web Development"
  },
  {
    icon: "📱",
    title: "App Development"
  },
  {
    icon: "🎨",
    title: "UI/UX Design"
  },
  {
    icon: "🔐",
    title: "Cyber Security"
  },
  {
    icon: "☁️",
    title: "Cloud Computing"
  },
  {
    icon: "📊",
    title: "Data Science"
  }
];

const Topics = () => {
  return (
    <section className="topics-section">
      <div className="topics-grid">
        {topics.map((topic, index) => (
          <div className="topic-card" key={index}>
            <span className="topic-icon">{topic.icon}</span>
            <span className="topic-title">{topic.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Topics;