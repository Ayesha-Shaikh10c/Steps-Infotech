import React from "react";

const TestimonialHero = () => {
  return (
    <section
      className="relative min-h-[190px] md:min-h-[230px] flex items-center"
      style={{
        backgroundImage:
          "url('/assets/testimonial-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16">

        <div className="max-w-xl text-center md:text-left">

          <h1 className="text-3xl md:text-5xl font-extrabold text-[#092c3c] leading-tight">
            WHAT <span className="text-[#087c8b]">OUR CLIENTS SAY</span>
            <br />
            ABOUT US
          </h1>

          <p className="mt-3 text-gray-700 text-base md:text-lg leading-relaxed">
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
