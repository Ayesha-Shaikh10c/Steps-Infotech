import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaUserCircle } from "react-icons/fa";

const testimonials = [
  {
    message:
      "Great place to learn and grow with supportive teammates and challenging projects.",
    name: "Rohit Mehta",
    role: "CEO",
    company: "Fin Crop Solutions",
  },
  {
    message:
      "Good work-life balance with competitive benefits and a positive work environment.",
    name: "Priya Sharma",
    role: "IT Manager",
    company: "Health Plus",
  },
  {
    message:
      "Excellent opportunities for skill development and career advancement.",
    name: "Amit Patel",
    role: "Product Head",
    company: "ShopEase",
  },
  {
    message:
      "The team delivered ahead of schedule without cutting corners on quality.",
    name: "Sneha Kulkarni",
    role: "Operations Director",
    company: "BrightRetail",
  },
  {
    message:
      "Clear communication throughout the project made a huge difference for us.",
    name: "Arjun Nair",
    role: "Founder",
    company: "UrbanCart",
  },
  {
    message:
      "Responsive support and a genuinely collaborative approach to problem solving.",
    name: "Meera Iyer",
    role: "CTO",
    company: "Skyline Logistics",
  },
];

const CARDS_PER_PAGE = 3;
const totalPages = Math.ceil(testimonials.length / CARDS_PER_PAGE);

const TestimonialCards = () => {
  const [page, setPage] = useState(0);

  const visibleTestimonials = testimonials.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  // Wraps around at both ends, so the arrows always do something
  // instead of getting stuck at the first/last page.
  const goPrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const goNext = () => setPage((p) => (p + 1) % totalPages);

  return (
    <section className="relative px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto flex items-center gap-5">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous testimonials"
          className="hidden md:block text-brand-teal hover:text-brand-teal-dark transition"
        >
          <FaChevronLeft size={42} />
        </button>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {visibleTestimonials.map((item, index) => (
            <div
              key={`${page}-${index}`}
              className="bg-white rounded-[25px] shadow-[10px_12px_15px_rgba(0,0,0,0.25)] px-8 py-8 min-h-[370px] flex flex-col justify-between"
            >
              {/* Quote */}
              <div>
                <div className="text-brand-teal text-6xl font-serif leading-none">
                  &ldquo;
                </div>
                <p className="text-center text-lg leading-tight text-text-strong px-3">
                  {item.message}
                </p>
              </div>

              {/* User */}
              <div>
                <div className="border-t border-border my-5"></div>

                <div className="flex items-center gap-3">
                  <FaUserCircle size={45} className="text-text-strong" />
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                    <p className="font-semibold">{item.role}</p>
                    <p className="text-brand-teal font-semibold">{item.company}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center mt-5">
                  <span className="text-4xl tracking-tight">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={goNext}
          aria-label="Next testimonials"
          className="hidden md:block text-brand-teal hover:text-brand-teal-dark transition"
        >
          <FaChevronRight size={42} />
        </button>
      </div>

      {/* Page dots — shows which set of testimonials you're on */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Go to testimonial page ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === page ? "w-6 bg-brand-teal" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TestimonialCards;