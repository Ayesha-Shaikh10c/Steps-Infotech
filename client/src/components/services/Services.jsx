import React, { useState } from "react";

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      number: "01",
      icon: "🖥️",
      title: "Web Development",
      shortDescription:
        "Modern, responsive websites designed to help businesses establish a strong digital presence.",
      details: [
        "Responsive website development",
        "Business and corporate websites",
        "Frontend and backend development",
        "Website optimization and maintenance",
      ],
    },
    {
      number: "02",
      icon: "📱",
      title: "Mobile App Development",
      shortDescription:
        "User-friendly mobile applications built for Android and iOS platforms.",
      details: [
        "Android application development",
        "iOS application development",
        "Mobile-friendly user interfaces",
        "Application testing and optimization",
      ],
    },
    {
      number: "03",
      icon: "⚙️",
      title: "Software Development",
      shortDescription:
        "Custom software solutions developed to simplify business operations and solve complex challenges.",
      details: [
        "Custom business software",
        "Application development",
        "Database integration",
        "Software testing and support",
      ],
    },
    {
      number: "04",
      icon: "☁️",
      title: "Cloud Solutions",
      shortDescription:
        "Scalable cloud solutions designed to improve accessibility, flexibility, and business efficiency.",
      details: [
        "Cloud application deployment",
        "Cloud infrastructure solutions",
        "Data backup solutions",
        "Cloud performance optimization",
      ],
    },
    {
      number: "05",
      icon: "🔒",
      title: "Cyber Security",
      shortDescription:
        "Security-focused solutions to help protect digital assets and business information.",
      details: [
        "Security assessment",
        "Network security solutions",
        "Security monitoring",
        "Data protection practices",
      ],
    },
    {
      number: "06",
      icon: "🎧",
      title: "IT Support & Maintenance",
      shortDescription:
        "Reliable technical support to keep your business systems running smoothly.",
      details: [
        "Technical troubleshooting",
        "System maintenance",
        "Software updates",
        "Performance monitoring",
      ],
    },
  ];

  return (
    <section className="bg-white px-6 py-20 md:px-12 lg:px-20">

      {/* Section Heading */}
      <div className="mx-auto mb-16 max-w-4xl text-center">

        <p className="mb-4 text-lg font-medium uppercase tracking-[4px] text-[#078b91]">
          What We Provide
        </p>

        <h2 className="mb-6 text-3xl font-light leading-tight text-[#062f3c] md:text-5xl">
          Comprehensive IT Solutions
          <br />
          <span className="font-normal">
            For Your Business
          </span>
        </h2>

        <p className="mx-auto max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
          From innovative websites to reliable software and secure digital
          infrastructure, we provide technology solutions designed around
          your business requirements.
        </p>

      </div>

      {/* Service Cards */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

        {services.map((service, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_8px_35px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_45px_rgba(0,120,125,0.20)] ${
              activeService === index
                ? "ring-2 ring-[#078b91]"
                : ""
            }`}
          >

            {/* Service Number */}
            <div className="absolute right-6 top-5 text-4xl font-bold text-gray-100 transition group-hover:text-[#d9f3f3]">
              {service.number}
            </div>

            {/* Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e1f5f4] text-3xl transition duration-300 group-hover:bg-[#078b91] group-hover:scale-110">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="mb-4 text-xl font-semibold text-[#063b47]">
              {service.title}
            </h3>

            {/* Description */}
            <p className="mb-6 min-h-[90px] text-sm leading-7 text-gray-600">
              {service.shortDescription}
            </p>

            {/* Expand Button */}
            <button
              onClick={() =>
                setActiveService(
                  activeService === index ? null : index
                )
              }
              className="flex items-center gap-2 text-sm font-semibold text-[#078b91] transition hover:gap-4"
            >
              {activeService === index
                ? "Show Less ↑"
                : "Explore Service →"}
            </button>

            {/* Expandable Details */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                activeService === index
                  ? "mt-6 max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="border-t border-gray-100 pt-5">

                <p className="mb-3 text-sm font-semibold text-[#063b47]">
                  What We Offer
                </p>

                <ul className="space-y-3">
                  {service.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-[#078b91]">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>

              </div>
            </div>

            {/* Bottom Border */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#078b91] transition-all duration-500 group-hover:w-full"></div>

          </div>
        ))}

      </div>

      {/* Bottom Statement */}
      <div className="mx-auto mt-16 max-w-4xl text-center">

        <p className="text-lg leading-8 text-gray-600">
          Have a unique business requirement?
          <span className="ml-2 font-medium text-[#078b91]">
            Let's build the right solution together.
          </span>
        </p>

      </div>

    </section>
  );
};

export default Services;