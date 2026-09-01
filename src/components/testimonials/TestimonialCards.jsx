import React from "react";
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
];

const TestimonialCards = () => {
  return (
    <section className="relative px-6 md:px-16 py-12">

      <div className="max-w-7xl mx-auto flex items-center gap-5">

        {/* Left Arrow */}
        <button className="hidden md:block text-[#09656b] hover:text-[#0bb1b5] transition">
          <FaChevronLeft size={42} />
        </button>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[25px] shadow-[10px_12px_15px_rgba(0,0,0,0.25)] px-8 py-8 min-h-[370px] flex flex-col justify-between"
            >

              {/* Quote */}
              <div>

                <div className="text-[#0ab0b0] text-6xl font-serif leading-none">
                  “
                </div>

                <p className="text-center text-lg leading-tight text-gray-900 px-3">
                  {item.message}
                </p>

              </div>

              {/* User */}
              <div>

                <div className="border-t border-gray-400 my-5"></div>

                <div className="flex items-center gap-3">

                  <FaUserCircle
                    size={45}
                    className="text-black"
                  />

                  <div>
                    <h3 className="font-bold text-lg leading-tight">
                      {item.name}
                    </h3>

                    <p className="font-semibold">
                      {item.role}
                    </p>

                    <p className="text-[#45aeb1] font-semibold">
                      {item.company}
                    </p>
                  </div>

                </div>

                {/* Stars */}
                <div className="flex justify-center mt-5">
                  <span className="text-4xl tracking-tight">
                    ⭐⭐⭐⭐⭐
                  </span>
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* Right Arrow */}
        <button className="hidden md:block text-[#09656b] hover:text-[#0bb1b5] transition">
          <FaChevronRight size={42} />
        </button>

      </div>

    </section>
  );
};

export default TestimonialCards;