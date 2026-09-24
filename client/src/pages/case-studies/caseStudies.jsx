import React from "react";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    category: "Web Development",
    title: "Modern Business Website",
    description:
      "A modern, responsive business platform designed to improve digital presence, user experience and customer engagement.",
    technologies: ["React", "Tailwind CSS", "Node.js"],
    result: "Improved digital experience",
  },
  {
    category: "Digital Solutions",
    title: "Enterprise Management Platform",
    description:
      "A scalable web application built to simplify business operations, manage information and improve workflow efficiency.",
    technologies: ["React", "Node.js", "MongoDB"],
    result: "Streamlined business operations",
  },
  {
    category: "AI & Technology",
    title: "AI-Powered Solution",
    description:
      "An intelligent digital solution designed to transform business data into actionable insights and better decisions.",
    technologies: ["Python", "AI", "Data Analytics"],
    result: "Data-driven decision making",
  },
];

const CaseStudies = () => {
  return (
    <main className="bg-[#f7fbfb] text-[#073b3f]">

      {/* HERO */}
      <section className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#16b8c4]">
            Steps Infotech
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
            Our Work.
            <br />
            <span className="text-[#16b8c4]">
              Our Impact.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Explore selected projects where technology, creativity and
            business strategy come together to create meaningful digital
            solutions.
          </p>

        </div>
      </section>


      {/* CASE STUDIES */}
      <section className="px-6 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">

          {caseStudies.map((project, index) => (
            <article
              key={index}
              className="group overflow-hidden rounded-2xl border border-[#d7eeee] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* IMAGE PLACEHOLDER */}
              <div className="flex h-64 items-center justify-center bg-[#073b3f]">
                <span className="text-5xl font-bold text-[#16b8c4]">
                  0{index + 1}
                </span>
              </div>

              <div className="p-7">

                <p className="text-sm font-semibold uppercase tracking-wider text-[#16b8c4]">
                  {project.category}
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  {project.title}
                </h2>

                <p className="mt-4 leading-7 text-gray-600">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-[#e8f8f9] px-3 py-1 text-xs font-medium text-[#087d84]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <p className="text-sm text-gray-500">
                    Key Result
                  </p>

                  <p className="mt-1 font-semibold">
                    {project.result}
                  </p>
                </div>

              </div>
            </article>
          ))}

        </div>
      </section>


      {/* CTA */}
      <section className="bg-[#073b3f] px-6 py-20 text-white md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16b8c4]">
              Have a project in mind?
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Let's build something meaningful.
            </h2>
          </div>

          <Link
            to="/contact"
            className="rounded-lg bg-[#16b8c4] px-7 py-4 font-semibold text-white transition hover:bg-[#11a3ad]"
          >
            Start Your Project →
          </Link>

        </div>
      </section>

    </main>
  );
};

export default CaseStudies;