import React from "react";

const ExploreWork = () => {
  const cards = [
    {
      title: "ACHIEVEMENT",
      text: "Driven by Innovation, Recognized for Results",
      icon: "🏆",
    },
    {
      title: "OUR TEAM",
      text: "Passionate People. Powerful Solutions",
      icon: "🤝",
    },
    {
      title: "PLACEMENT",
      text: "Empowering Careers Through Opportunity",
      icon: "💼",
    },
    {
      title: "SECURITY ROLES",
      text: "Security at the core of Everything we build",
      icon: "🔒",
    },
  ];

  return (
    <section
      style={{
        width: "100%",
        padding: "55px 7% 70px",
        backgroundColor: "#eefafa",
        boxSizing: "border-box",
      }}
    >
      {/* Heading */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <p
          style={{
            margin: "0 0 8px",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "2px",
            color: "#138a8f",
          }}
        >
          WHAT WE DO
        </p>

        <h2
          style={{
            margin: 0,
            fontSize: "30px",
            fontWeight: "700",
            color: "#071f24",
          }}
        >
          EXPLORE OUR WORK
        </h2>

        <div
          style={{
            width: "60px",
            height: "3px",
            backgroundColor: "#15969b",
            margin: "12px auto 0",
            borderRadius: "5px",
          }}
        />
      </div>

      {/* Cards */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "32px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              minHeight: "235px",
              padding: "35px 40px",
              backgroundColor: "#ffffff",
              border: "1px solid #b9dddd",
              borderRadius: "18px",
              boxShadow: "0 10px 25px rgba(0, 55, 60, 0.14)",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",

              /* Hover animation */
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 18px 35px rgba(0, 80, 85, 0.22)";
              e.currentTarget.style.borderColor = "#15969b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0, 55, 60, 0.14)";
              e.currentTarget.style.borderColor = "#b9dddd";
            }}
          >
            {/* Top teal line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "12%",
                width: "76%",
                height: "4px",
                backgroundColor: "#15969b",
                borderRadius: "0 0 5px 5px",
              }}
            />

            {/* Icon */}
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "#f1fbfb",
                border: "2px solid #15969b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                marginBottom: "18px",
                transition: "all 0.3s ease",
              }}
            >
              {card.icon}
            </div>

            {/* Title */}
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "0.7px",
                color: "#071f24",
              }}
            >
              {card.title}
            </h3>

            {/* Text */}
            <p
              style={{
                margin: 0,
                maxWidth: "400px",
                fontSize: "15px",
                lineHeight: "1.6",
                color: "#526467",
              }}
            >
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreWork;