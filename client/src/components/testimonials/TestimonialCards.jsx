import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
  FaPen,
  FaTimes,
  FaStar,
} from "react-icons/fa";

const initialTestimonials = [
  {
    message:
      "Great place to learn and grow with supportive teammates and challenging projects.",
    name: "Rohit Mehta",
    role: "CEO",
    company: "Fin Crop Solutions",
    rating: 5,
  },
  {
    message:
      "Good work-life balance with competitive benefits and a positive work environment.",
    name: "Priya Sharma",
    role: "IT Manager",
    company: "Health Plus",
    rating: 5,
  },
  {
    message:
      "Excellent opportunities for skill development and career advancement.",
    name: "Amit Patel",
    role: "Product Head",
    company: "ShopEase",
    rating: 5,
  },
  {
    message:
      "The team delivered ahead of schedule without cutting corners on quality.",
    name: "Sneha Kulkarni",
    role: "Operations Director",
    company: "BrightRetail",
    rating: 5,
  },
  {
    message:
      "Clear communication throughout the project made a huge difference for us.",
    name: "Arjun Nair",
    role: "Founder",
    company: "UrbanCart",
    rating: 5,
  },
  {
    message:
      "Responsive support and a genuinely collaborative approach to problem solving.",
    name: "Meera Iyer",
    role: "CTO",
    company: "Skyline Logistics",
    rating: 5,
  },
];

const CARDS_PER_PAGE = 3;

const TestimonialCards = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [page, setPage] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    message: "",
    rating: 5,
  });

  const totalPages = Math.ceil(
    testimonials.length / CARDS_PER_PAGE
  );

  const visibleTestimonials = testimonials.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  // Previous page
  const goPrev = () => {
    setPage((currentPage) =>
      currentPage === 0 ? totalPages - 1 : currentPage - 1
    );
  };

  // Next page
  const goNext = () => {
    setPage((currentPage) =>
      currentPage === totalPages - 1 ? 0 : currentPage + 1
    );
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit review
  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      message: formData.message,
      name: formData.name,
      role: formData.role,
      company: formData.company,
      rating: Number(formData.rating),
    };

    // Add new review
    setTestimonials([...testimonials, newReview]);

    // Move to the page containing the new review
    const newPage = Math.floor(
      testimonials.length / CARDS_PER_PAGE
    );
    setPage(newPage);

    // Clear form
    setFormData({
      name: "",
      role: "",
      company: "",
      message: "",
      rating: 5,
    });

    // Close form
    setShowForm(false);
  };

  return (
    <section className="relative px-6 md:px-16 py-12">

      {/* Write Review Button */}
      <div className="max-w-7xl mx-auto flex justify-end mb-6">
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="
            flex items-center gap-2
            bg-[#087c8b]
            hover:bg-[#065f6b]
            text-white
            px-5 py-3
            rounded-full
            font-semibold
            transition
            shadow-md
          "
        >
          <FaPen size={15} />
          Write a Review
        </button>
      </div>

      {/* Testimonial Cards */}
      <div className="max-w-7xl mx-auto flex items-center gap-5">

        {/* Left Arrow */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous testimonials"
          className="
            hidden md:block
            text-brand-teal
            hover:text-brand-teal-dark
            transition
          "
        >
          <FaChevronLeft size={42} />
        </button>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

          {visibleTestimonials.map((item, index) => (
            <div
              key={`${page}-${index}`}
              className="
                bg-white
                rounded-[25px]
                shadow-[10px_12px_15px_rgba(0,0,0,0.25)]
                px-8 py-8
                min-h-[370px]
                flex flex-col
                justify-between
              "
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

              {/* User Details */}
              <div>
                <div className="border-t border-border my-5"></div>

                <div className="flex items-center gap-3">

                  <FaUserCircle
                    size={45}
                    className="text-text-strong"
                  />

                  <div>
                    <h3 className="font-bold text-lg leading-tight">
                      {item.name}
                    </h3>

                    <p className="font-semibold">
                      {item.role}
                    </p>

                    <p className="text-brand-teal font-semibold">
                      {item.company}
                    </p>
                  </div>

                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-1 mt-5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      size={22}
                      className={
                        index < item.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
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
          className="
            hidden md:block
            text-brand-teal
            hover:text-brand-teal-dark
            transition
          "
        >
          <FaChevronRight size={42} />
        </button>

      </div>

      {/* Page Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              aria-label={`Go to testimonial page ${index + 1}`}
              className={`
                h-2 rounded-full transition-all
                ${
                  index === page
                    ? "w-6 bg-brand-teal"
                    : "w-2 bg-border"
                }
              `}
            />
          ))}

        </div>
      )}

      {/* Review Form Modal */}
      {showForm && (
        <div
          className="
            fixed inset-0
            z-50
            flex items-center justify-center
            bg-black/50
            px-4
          "
        >

          <div
            className="
              relative
              bg-white
              w-full
              max-w-lg
              rounded-[25px]
              shadow-2xl
              p-7
              max-h-[90vh]
              overflow-y-auto
            "
          >

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label="Close review form"
              className="
                absolute
                top-5
                right-5
                text-gray-500
                hover:text-black
                transition
              "
            >
              <FaTimes size={22} />
            </button>

            {/* Form Heading */}
            <h2 className="text-3xl font-bold text-[#125566] mb-2">
              Share Your Experience
            </h2>

            <p className="text-gray-600 mb-6">
              Tell us about your experience with Steps Infotech.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label className="block font-semibold mb-1">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="
                    w-full
                    border border-gray-300
                    rounded-lg
                    px-4 py-3
                    outline-none
                    focus:border-[#087c8b]
                  "
                />
              </div>

              {/* Role */}
              <div>
                <label className="block font-semibold mb-1">
                  Role
                </label>

                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. CEO, Manager, Founder"
                  required
                  className="
                    w-full
                    border border-gray-300
                    rounded-lg
                    px-4 py-3
                    outline-none
                    focus:border-[#087c8b]
                  "
                />
              </div>

              {/* Company */}
              <div>
                <label className="block font-semibold mb-1">
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company"
                  required
                  className="
                    w-full
                    border border-gray-300
                    rounded-lg
                    px-4 py-3
                    outline-none
                    focus:border-[#087c8b]
                  "
                />
              </div>

              {/* Review */}
              <div>
                <label className="block font-semibold mb-1">
                  Your Review
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your review..."
                  rows="4"
                  required
                  className="
                    w-full
                    border border-gray-300
                    rounded-lg
                    px-4 py-3
                    outline-none
                    resize-none
                    focus:border-[#087c8b]
                  "
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block font-semibold mb-2">
                  Rating
                </label>

                <div className="flex gap-2">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          rating: star,
                        })
                      }
                      aria-label={`${star} star rating`}
                      className="transition-transform hover:scale-110"
                    >
                      <FaStar
                        size={28}
                        className={
                          star <= formData.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}

                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="
                  w-full
                  bg-[#087c8b]
                  hover:bg-[#065f6b]
                  text-white
                  font-bold
                  py-3
                  rounded-lg
                  transition
                "
              >
                Submit Review
              </button>

            </form>
          </div>
        </div>
      )}

    </section>
  );
};

export default TestimonialCards;

