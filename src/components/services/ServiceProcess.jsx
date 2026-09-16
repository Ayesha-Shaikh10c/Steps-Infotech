import React from "react";

const ServiceProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Understanding Your Needs",
      description:
        "We begin by understanding your business goals, requirements, and challenges.",
    },
    {
      number: "02",
      title: "Planning & Strategy",
      description:
        "Our team creates a clear plan and defines the right technology approach for your project.",
    },
    {
      number: "03",
      title: "Design & Development",
      description:
        "We design and develop practical, user-friendly, and scalable digital solutions.",
    },
    {
      number: "04",
      title: "Testing & Delivery",
      description:
        "We test the solution, refine its performance, and prepare it for delivery.",
    },
    {
      number: "05",
      title: "Support & Improvement",
      description:
        "We provide ongoing assistance and help improve your solution when required.",
    },
  ];

  return (
    <section className="bg-[#f5fbfb] px-6 py-24 md:px-12 lg:px-20">

      {/* Heading */}
      <div className="mx-auto mb-16 max-w-3xl text-center">

        <p className="mb-4 text-lg uppercase tracking-[4px] text-[#078b91]">
          How We Work
        </p>

        <h2 className="mb-6 text-3xl font-light text-[#063b47] md:text-5xl">
          Our Service Process
        </h2>

        <p className="text-base leading-8 text-gray-600 md:text-lg">
          A structured approach that helps us transform your ideas into
          practical and effective technology solutions.
        </p>

      </div>

      {/* Process Timeline */}
      <div className="mx-auto max-w-5xl">

        {steps.map((step, index) => (
          <div
            key={index}
            className="group relative flex gap-6 pb-12 last:pb-0 md:gap-10"
          >

            {/* Timeline Line */}
            {index !== steps.length - 1 && (
              <div className="absolute left-[27px] top-14 h-full w-[2px] bg-[#b9e2e2]"></div>
            )}

            {/* Number */}
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#078b91] bg-white text-sm font-bold text-[#078b91] transition group-hover:bg-[#078b91] group-hover:text-white">
              {step.number}
            </div>

            {/* Content */}
            <div className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 group-hover:shadow-lg md:flex-1">

              <h3 className="mb-3 text-xl font-semibold text-[#063b47]">
                {step.title}
              </h3>

              <p className="text-sm leading-7 text-gray-600 md:text-base">
                {step.description}
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default ServiceProcess;