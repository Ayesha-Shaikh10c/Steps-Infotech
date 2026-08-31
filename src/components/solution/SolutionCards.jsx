import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { SOLUTIONS, EXTRA_SOLUTIONS } from "./solutionsData";

export default function SolutionCards() {
  const [showMore, setShowMore] = useState(false);

  const visibleSolutions = showMore
    ? [...SOLUTIONS, ...EXTRA_SOLUTIONS]
    : SOLUTIONS;

  return (
    <section className="bg-white font-body">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-teal font-semibold tracking-widest text-xs md:text-sm">
            WHAT WE SOLVE
          </span>
          <h2 className="font-heading text-brand-navy text-2xl md:text-4xl mt-2 mb-4">
            Solutions For Every Business Need
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            From startups to enterprises, we deliver scalable solutions that enhance
            efficiency, improve productivity and accelerate digital transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleSolutions.map(({ slug, icon: Icon, title, desc }) => (
            <div
              key={slug}
              className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-info flex items-center justify-center text-brand-teal text-xl mb-4">
                <Icon />
              </div>
              <h3 className="font-heading text-brand-navy text-base md:text-lg mb-2">
                {title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{desc}</p>
              <Link
                to={`/solutions/${slug}`}
                className="inline-flex items-center gap-1 text-brand-teal text-sm font-semibold hover:gap-2 transition-all"
              >
                Learn More <FaArrowRight className="text-xs" />
              </Link>
            </div>
          ))}

          {/* More Solutions CTA card — hides once extra cards are shown */}
          {!showMore && (
            <button
              onClick={() => setShowMore(true)}
              className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 bg-brand-info text-brand-navy font-heading text-base md:text-lg"
            >
              More Solutions <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}