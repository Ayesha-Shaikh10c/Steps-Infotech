import React from "react";
import portfolioImage from "../../assets/images/portfolio.png";

const Hero = () => {
  return (
    <div
      style={{
        width: "100%",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      {/* HERO SECTION */}
      <section
        className="
          relative
          flex
          h-[380px]
          w-full
          items-center
          justify-between
          overflow-hidden
          md:h-[420px]
          lg:h-[500px]
        "
        style={{
          padding: "40px 8%",
          background:
            "linear-gradient(135deg, #021c20 0%, #06343a 55%, #00181c 100%)",
          boxSizing: "border-box",
        }}
      >
        {/* Main teal glow */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(21,150,155,0.30), transparent 68%)",
            right: "2%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />

        {/* Small glow on left */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(21,150,155,0.15), transparent 70%)",
            left: "-120px",
            top: "-100px",
          }}
        />

        {/* Large circle */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: "220px",
            height: "220px",
            border: "1px solid rgba(32,194,200,0.22)",
            borderRadius: "50%",
            top: "-110px",
            left: "-70px",
          }}
        />

        {/* Second circle */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: "330px",
            height: "330px",
            border: "1px solid rgba(32,194,200,0.12)",
            borderRadius: "50%",
            top: "-165px",
            left: "-125px",
          }}
        />

        {/* Bottom right circle */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: "380px",
            height: "380px",
            border: "1px solid rgba(32,194,200,0.14)",
            borderRadius: "50%",
            right: "-190px",
            bottom: "-210px",
          }}
        />

        {/* Technology grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.06,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* LEFT CONTENT */}
        <div className="relative z-10 w-[50%] max-w-[650px] text-white">
          <p
            className="mb-[15px] font-body"
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: "#20c2c8",
            }}
          >
            STEPS INFOTECH
          </p>

          <h2
            className="font-heading"
            style={{
              fontSize: "44px",
              lineHeight: "1.15",
              margin: "0 0 25px",
              fontWeight: "700",
              color: "#ffffff",
            }}
          >
            SOLUTIONS WE BUILT.
            <br />

            <span style={{ color: "#20c2c8" }}>
              SUCCESS WE DELIVER.
            </span>
          </h2>

          <p
            className="font-body"
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

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            {/* View Case Studies Button */}
            <button
              className="font-body"
              style={{
                padding: "14px 25px",
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

            {/* Start Your Project Button */}
            <button
              className="font-body"
              style={{
                padding: "14px 25px",
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

        {/* RIGHT IMAGE */}
        <div
          className="
            relative
            z-10
            flex
            h-[300px]
            w-[45%]
            items-center
            justify-center
            md:h-[340px]
            lg:h-[380px]
          "
        >
          <img
            src={portfolioImage}
            alt="Portfolio project"
            className="h-full w-full object-contain"
            style={{
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
              e.currentTarget.style.transform = "scale(1) translateY(0)";
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