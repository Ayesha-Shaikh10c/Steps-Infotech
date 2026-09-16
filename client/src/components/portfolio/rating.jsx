import React from "react";

const Rating = () => {
  return (
    <section
      style={{
        width: "100%",
        padding: "0 7% 40px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          minHeight: "130px",
          margin: "0 auto",
          padding: "25px 40px",
          backgroundColor: "#b5d8d9",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
        }}
      >
        {/* LEFT SIDE - QUOTE */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          {/* Quote Icon */}
          <div
            style={{
              fontSize: "52px",
              lineHeight: "0.8",
              fontWeight: "700",
              color: "#0877b9",
            }}
          >
            “
          </div>

          {/* Testimonial */}
          <div>
            <p
              style={{
                margin: "0 0 8px",
                fontSize: "15px",
                lineHeight: "1.5",
                color: "#111111",
                maxWidth: "520px",
              }}
            >
              The team delivered an exceptional solution that transformed
              our business operations. Their expertise, communication,
              and commitment to quality are outstanding.
            </p>

            <p
              style={{
                margin: "0",
                fontSize: "14px",
                color: "#222222",
              }}
            >
              -XYZ
            </p>

            <p
              style={{
                margin: "2px 0 0",
                fontSize: "13px",
                color: "#333333",
              }}
            >
              CEO
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - RATING */}
        <div
          style={{
            minWidth: "150px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "34px",
              fontWeight: "400",
              color: "#111111",
              marginBottom: "5px",
            }}
          >
            4.0
          </div>

          <div
            style={{
              fontSize: "25px",
              letterSpacing: "3px",
              color: "#f2c400",
            }}
          >
            ★★★★
            <span style={{ color: "#ffffff" }}>★</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rating;