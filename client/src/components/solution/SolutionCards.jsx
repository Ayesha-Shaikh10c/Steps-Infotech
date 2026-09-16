import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { SOLUTIONS, EXTRA_SOLUTIONS } from "./solutionsData";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";

export default function SolutionCards() {
  const [showMore, setShowMore] = useState(false);

  const visibleSolutions = showMore
    ? [...SOLUTIONS, ...EXTRA_SOLUTIONS]
    : SOLUTIONS;

  return (
    <section className="bg-white font-body">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <SectionHeading
          eyebrow="What We Solve"
          title="Solutions For Every Business Need"
          subtitle="From startups to enterprises, we deliver scalable solutions that enhance efficiency, improve productivity and accelerate digital transformation."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleSolutions.map(({ slug, icon: Icon, title, desc }) => (
            <Card key={slug} padding="sm" rounded="rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-brand-info flex items-center justify-center text-brand-teal text-xl mb-4">
                <Icon />
              </div>
              <h3 className="font-heading text-brand-navy text-base md:text-lg mb-2">
                {title}
              </h3>
              <p className="text-text-muted text-sm mb-4">{desc}</p>
              <Link
                to={`/solutions/${slug}`}
                className="inline-flex items-center gap-1 text-brand-teal text-sm font-semibold hover:gap-2 transition-all"
              >
                Learn More <FaArrowRight className="text-xs" />
              </Link>
            </Card>
          ))}

          {/* More Solutions CTA card — hides once extra cards are shown.
              Kept as a plain <button> (not the Card component) since it
              needs to BE the click target, not just contain one. */}
          {!showMore && (
            <button
              onClick={() => setShowMore(true)}
              className="border border-border rounded-xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 bg-brand-info text-brand-navy font-heading text-base md:text-lg"
            >
              More Solutions <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}