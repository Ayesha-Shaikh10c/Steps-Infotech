import React, { useState } from "react";

const ProjectCTA = () => {
  const [hover, setHover] = useState(false);

  return (
    <section
      style={{
        width: "100%",
        padding: "30px 7% 55px",
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          minHeight: "170px",
          padding: "35px 45px",
          backgroundColor: "#d9eeee",
          borderRadius: "18px",
          border: "1px solid #a9d4d5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "35px",
          boxSizing: "border-box",
          boxShadow: "0 8px 22px rgba(0, 60, 65, 0.10)",
        }}
      >
        {/* LEFT - ICON */}
        <div
          style={{
            width: "75px",
            height: "75px",
            minWidth: "75px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: "2px solid #15969b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            transition: "all 0.3s ease",
            transform: hover ? "rotate(8deg) scale(1.08)" : "scale(1)",
          }}
        >
          💡
        </div>

        {/* MIDDLE - CONTENT */}
        <div
          style={{
            flex: 1,
          }}
        >
          <h2
            style={{
              margin: "0 0 10px",
              fontSize: "24px",
              fontWeight: "700",
              color: "#071f24",
            }}
          >
            HAVE A PROJECT IN MIND?
          </h2>

          <p
            style={{
              margin: 0,
              maxWidth: "650px",
              fontSize: "15px",
              lineHeight: "1.6",
              color: "#405457",
            }}
          >
            Let's build something great together. Share your ideas and
            we'll turn them into powerful digital solutions.
          </p>
        </div>

        {/* RIGHT - BUTTON */}
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            minWidth: "190px",
            padding: "15px 24px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: hover ? "#0c777c" : "#15969b",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s ease",
            transform: hover ? "translateY(-4px)" : "translateY(0)",
            boxShadow: hover
              ? "0 10px 20px rgba(21, 150, 155, 0.30)"
              : "0 4px 10px rgba(0, 0, 0, 0.10)",
          }}
        >
          Let's Work Together&nbsp; →
        </button>
      </div>
    </section>
  );
};

export default ProjectCTA;