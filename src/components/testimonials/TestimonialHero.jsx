import React from "react";

const TestimonialHero = () => {
  return (
    <section
      className="
        page-hero
        relative
        flex
        items-center
      "
      style={{
        backgroundImage: "url('/assets/testimonial-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40" />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-6

          md:px-16
        "
      >
        <div className="max-w-xl text-center md:text-left">
          <h1
            className="
              font-heading
              text-3xl
              font-extrabold
              leading-tight
              text-[#092c3c]

              md:text-5xl
            "
          >
            WHAT{" "}
            <span className="text-[#087c8b]">
              OUR CLIENTS SAY
            </span>
            <br />
            ABOUT US
          </h1>

          <p
            className="
              mt-3
              font-body
              text-base
              leading-relaxed
              text-gray-700

              md:text-lg
            "
          >
            We take pride in delivering exceptional
            solutions and building long-term
            relationships with our clients.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialHero;