import React from "react";

const Stats = () => {
  const stats = [
    {
      number: "150+",
      text: "projects completed",
      icon: "▣",
    },
    {
      number: "100+",
      text: "Happy clients",
      icon: "☺",
    },
    {
      number: "5+",
      text: "years of experience",
      icon: "✦",
    },
    {
      number: "50+",
      text: "expert professionals",
      icon: "♟",
    },
  ];

  return (
    <section
      style={{
        width: "100%",
        padding: "15px 7% 45px",
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #d8e5e5",
          borderBottom: "1px solid #d8e5e5",
        }}
      >
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            
            {/* STAT */}
            <div
              style={{
                flex: 1,
                padding: "22px 15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderRadius: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#eefafa";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              
              {/* Icon */}
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  backgroundColor: "#eefafa",
                  border: "1px solid #15969b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  color: "#111111",
                  transition: "all 0.3s ease",
                }}
              >
                {stat.icon}
              </div>

              {/* Number + Label */}
              <div>
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "700",
                    color: "#15969b",
                    lineHeight: "1.1",
                  }}
                >
                  {stat.number}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#333333",
                    marginTop: "5px",
                  }}
                >
                  {stat.text}
                </div>
              </div>
            </div>

            {/* Divider */}
            {index !== stats.length - 1 && (
              <div
                style={{
                  width: "1px",
                  height: "65px",
                  backgroundColor: "#c7d7d7",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Stats;