import React from "react";
import { FaLightbulb, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProjectCTA = () => {
  return (
    <section className="w-full bg-white px-[7%] pb-14 pt-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl border border-brand-teal/30 bg-brand-info px-8 py-9 shadow-[0_8px_22px_rgba(0,60,65,0.10)] sm:flex-row sm:justify-between">

        {/* Icon */}
        <div className="flex h-[75px] w-[75px] shrink-0 items-center justify-center rounded-full border-2 border-brand-teal bg-white text-3xl text-brand-teal transition-transform duration-300 hover:rotate-6 hover:scale-105">
          <FaLightbulb />
        </div>

        {/* Content */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="mb-2 font-heading text-2xl font-bold text-brand-navy">
            Have a Project in Mind?
          </h2>

          <p className="mx-auto max-w-xl font-body text-sm leading-relaxed text-brand-desc sm:mx-0">
            Let's build something great together. Share your ideas and we'll
            turn them into powerful digital solutions.
          </p>
        </div>

        {/* Button */}
        <Link
          to="/contact"
          className="group flex min-w-[190px] items-center justify-center gap-2 rounded-lg bg-brand-teal px-6 py-4 font-body text-sm font-bold text-white shadow-[0_4px_10px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0c777c] hover:shadow-[0_10px_20px_rgba(21,150,155,0.30)]"
        >
          Let's Work Together

          <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

      </div>
    </section>
  );
};

export default ProjectCTA;