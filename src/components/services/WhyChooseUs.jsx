import React from "react";

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: "🎯",
      title: "Business-Focused Solutions",
      description:
        "We focus on understanding your business requirements and delivering solutions that support your goals.",
    },
    {
      icon: "💡",
      title: "Modern Technology",
      description:
        "We use modern tools and development practices to create reliable and scalable digital solutions.",
    },
    {
      icon: "🔧",
      title: "Reliable Performance",
      description:
        "Our solutions are designed with performance, usability, and long-term reliability in mind.",
    },
    {
      icon: "🤝",
      title: "Collaborative Approach",
      description:
        "We believe in clear communication and collaboration throughout the development process.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#063b47] px-6 py-24 md:px-12 lg:px-20">

      {/* Background Decoration */}
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border-[50px] border-[#078b91]/20"></div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16 max-w-3xl">

          <p className="mb-4 text-lg uppercase tracking-[4px] text-[#42d1d2]">
            Why Work With Us
          </p>

          <h2 className="mb-6 text-3xl font-light leading-tight text-white md:text-5xl">
            Technology That Helps
            <br />
            <span className="font-medium">
              Your Business Move Forward
            </span>
          </h2>

          <p className="max-w-2xl text-base leading-8 text-gray-200 md:text-lg">
            We combine technical expertise, creative thinking, and a
            customer-focused approach to deliver meaningful digital solutions.
          </p>

        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-white/10 bg-white/[0.06] p-7 transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.12]"
            >

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#078b91] text-2xl transition group-hover:scale-110">
                {benefit.icon}
              </div>

              <h3 className="mb-4 text-xl font-medium text-white">
                {benefit.title}
              </h3>

              <p className="text-sm leading-7 text-gray-300">
                {benefit.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;