import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";

const testimonial = {
  quote:
    "The team delivered an exceptional solution that transformed our business operations. Their expertise, communication, and commitment to quality are outstanding.",
  author: "XYZ",
  role: "CEO",
  rating: 4.0,
  outOf: 5,
};

function Rating() {
  const fullStars = Math.round(testimonial.rating);

  return (
    <section className="mx-auto mt-[70px] max-w-6xl bg-brand-info px-8 py-11 sm:px-14">
      <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-between">
        {/* Testimonial */}
        <div className="max-w-2xl">
          <div className="mb-5 font-heading text-5xl leading-none text-brand-teal">
            &ldquo;
          </div>

          <p className="mb-4 font-body text-lg leading-relaxed text-brand-navy">
            {testimonial.quote}
          </p>

          <p className="font-body text-sm text-brand-navy">
            — {testimonial.author}
          </p>
          <p className="mt-1 font-body text-sm text-brand-desc">
            {testimonial.role}
          </p>
        </div>

        {/* Rating */}
        <div className="min-w-[170px] text-center">
          <h2 className="mb-2 font-heading text-5xl text-brand-navy">
            {testimonial.rating.toFixed(1)}
          </h2>

          <div className="flex justify-center gap-1 text-2xl">
            {Array.from({ length: testimonial.outOf }).map((_, i) =>
              i < fullStars ? (
                <FaStar key={i} className="text-yellow-400" />
              ) : (
                <FaRegStar key={i} className="text-brand-desc/40" />
              )
            )}
          </div>

          <p className="mt-3 font-body text-sm text-brand-desc">
            Client satisfaction
          </p>
        </div>
      </div>
    </section>
  );
}

export default Rating;
