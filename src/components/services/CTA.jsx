import React from "react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#063b47] px-6 py-24 md:px-12 lg:px-20">

      {/* Decorative Circles */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[60px] border-[#078b91]/20"></div>

      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full border-[50px] border-[#078b91]/10"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">

        <p className="mb-5 text-lg uppercase tracking-[4px] text-[#42d1d2]">
          Let's Work Together
        </p>

        <h2 className="mb-6 text-3xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
          Have a Project in Mind?
          <br />
          <span className="font-medium">
            Let's Build Something Great.
          </span>
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-8 text-gray-200 md:text-lg">
          Whether you need a website, mobile application, or customized
          software solution, our team is ready to discuss your requirements.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/contact")}
          className="rounded-full bg-[#09b9c4] px-10 py-4 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#078b91] hover:shadow-xl"
        >
          Let's Talk About Your Project →
        </button>

        <p className="mt-8 text-sm text-gray-300">
          Let's turn your ideas into meaningful digital solutions.
        </p>

      </div>

    </section>
  );
};

export default CTA;
