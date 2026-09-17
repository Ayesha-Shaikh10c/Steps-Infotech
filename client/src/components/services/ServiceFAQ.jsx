import React, { useState } from "react";

const ServiceFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What types of IT services do you provide?",
      answer:
        "We provide web development, mobile app development, software development, cloud solutions, cybersecurity, and IT support and maintenance.",
    },
    {
      question: "Can you develop customized software for our business?",
      answer:
        "Yes. We develop customized software solutions based on your business requirements, workflows, and project goals.",
    },
    {
      question: "Do you provide support after project delivery?",
      answer:
        "Yes. We can provide technical support, maintenance, updates, and assistance to help keep your solution running smoothly.",
    },
    {
      question: "How do you begin a new project?",
      answer:
        "We begin by understanding your requirements, discussing your goals, planning the project, and deciding on the appropriate development approach.",
    },
    {
      question: "Can your services be customized according to our needs?",
      answer:
        "Yes. Our services can be adapted to your business requirements, project scope, and technical objectives.",
    },
  ];

  return (
    <section className="bg-white px-6 py-24 md:px-12 lg:px-20">

      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-14 text-center">

          <p className="mb-4 text-lg uppercase tracking-[4px] text-[#078b91]">
            Have Questions?
          </p>

          <h2 className="mb-5 text-3xl font-light text-[#063b47] md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600">
            Find answers to common questions about our services.
          </p>

        </div>

        {/* FAQ List */}
        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-[#078b91]"
            >

              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >

                <span className="text-base font-medium text-[#063b47] md:text-lg">
                  {faq.question}
                </span>

                <span className="shrink-0 text-2xl text-[#078b91]">
                  {openIndex === index ? "−" : "+"}
                </span>

              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-60 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >

                <p className="px-6 pb-6 text-sm leading-7 text-gray-600">
                  {faq.answer}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default ServiceFAQ;
