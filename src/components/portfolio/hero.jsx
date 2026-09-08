import React from "react";

const Hero = () => {
  return (
    <div
      style={{
        width: "100%",
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* PAGE TITLE */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "400",
          margin: "28px 0 18px",
          color: "#111111",
        }}
      >
        OUR PORTFOLIO
      </h1>

      {/* HERO SECTION */}
      <section
        style={{
          width: "100%",
          minHeight: "540px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px 8%",
          background:
            "linear-gradient(135deg, #021c20 0%, #06343a 55%, #00181c 100%)",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* ================= BACKGROUND EFFECTS ================= */}

        {/* Main teal glow */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(21,150,155,0.30), transparent 68%)",
            right: "2%",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        />

        {/* Small glow on left */}
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(21,150,155,0.15), transparent 70%)",
            left: "-120px",
            top: "-100px",
            pointerEvents: "none",
          }}
        />

        {/* Large circle - top left */}
        <div
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            border: "1px solid rgba(32,194,200,0.22)",
            borderRadius: "50%",
            top: "-110px",
            left: "-70px",
            pointerEvents: "none",
          }}
        />

        {/* Second circle */}
        <div
          style={{
            position: "absolute",
            width: "330px",
            height: "330px",
            border: "1px solid rgba(32,194,200,0.12)",
            borderRadius: "50%",
            top: "-165px",
            left: "-125px",
            pointerEvents: "none",
          }}
        />

        {/* Bottom right circle */}
        <div
          style={{
            position: "absolute",
            width: "380px",
            height: "380px",
            border: "1px solid rgba(32,194,200,0.14)",
            borderRadius: "50%",
            right: "-190px",
            bottom: "-210px",
            pointerEvents: "none",
          }}
        />

        {/* Technology grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
            pointerEvents: "none",
          }}
        />

        {/* ================= LEFT CONTENT ================= */}

        <div
          style={{
            width: "50%",
            maxWidth: "650px",
            color: "#ffffff",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Small label */}
          <p
            style={{
              margin: "0 0 15px",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: "#20c2c8",
            }}
          >
            STEPS INFOTECH
          </p>

          {/* Main heading */}
          <h2
            style={{
              fontSize: "44px",
              lineHeight: "1.15",
              margin: "0 0 25px",
              fontWeight: "700",
            }}
          >
            SOLUTIONS WE BUILT.
            <br />

            <span
              style={{
                color: "#20c2c8",
              }}
            >
              SUCCESS WE DELIVER.
            </span>
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#e4eeee",
              margin: "0 0 30px",
              maxWidth: "580px",
            }}
          >
            Explore our innovative projects that showcase our expertise,
            creativity and commitment to deliver exceptional results.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            {/* Button 1 */}
            <button
              style={{
                padding: "16px 25px",
                backgroundColor: "#20aeb5",
                color: "#ffffff",
                border: "none",
                borderRadius: "7px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#15969b";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 22px rgba(21,150,155,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#20aeb5";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              View Case Studies →
            </button>

            {/* Button 2 */}
            <button
              style={{
                padding: "16px 25px",
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid #20aeb5",
                borderRadius: "7px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#20aeb5";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 22px rgba(21,150,155,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Start Your Project →
            </button>
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}

        <div
          style={{
            width: "45%",
            height: "420px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <img
            src="/portfolio.png"
            alt="Portfolio project"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "all 0.4s ease",
              filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.30))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "scale(1.05) translateY(-6px)";
              e.currentTarget.style.filter =
                "drop-shadow(0 20px 35px rgba(21,150,155,0.30))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "scale(1) translateY(0)";
              e.currentTarget.style.filter =
                "drop-shadow(0 15px 30px rgba(0,0,0,0.30))";
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;