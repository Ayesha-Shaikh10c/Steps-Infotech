import React from "react";

const TestimonialHeader = () => {
  return (
    <section className="text-center px-6 pt-12">

      <p className="text-[#3da6aa] text-xl md:text-2xl font-bold">
        CLIENT TESTIMONIALS
      </p>

      <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#125566]">
        Trusted By Our Businesses Across Industries
      </h2>

      <div className="w-[70%] md:w-[45%] h-[1px] bg-[#76a9ad] mx-auto mt-8"></div>

      <p className="max-w-3xl mx-auto mt-10 text-xl md:text-2xl font-bold text-[#145566] leading-tight">
        Hear from our clients about their experience working with
        <br className="hidden md:block" />
        Steps Infotech
      </p>

    </section>
  );
};

export default TestimonialHeader;