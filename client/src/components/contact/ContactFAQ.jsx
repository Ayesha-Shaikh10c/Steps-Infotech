import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import SectionHeading from "../ui/SectionHeading";

const FAQS = [
  {
    q: "Do I need prior experience to apply for an internship?",
    a: "No. Our internships are built for students who are still learning — mentors guide you through real tasks step by step, regardless of your starting point.",
  },
  {
    q: "Are the internships paid?",
    a: "Some programs include a stipend based on role and duration. This is confirmed with you directly once your application is reviewed.",
  },
  {
    q: "How long does an internship run?",
    a: "Most programs run 3 to 6 months, with flexible scheduling around your college timetable.",
  },
  {
    q: "Can I complete the internship remotely?",
    a: "Yes, most tracks support remote work, with a few roles offering an in-office option at our Pune location.",
  },
  {
    q: "I run a business — how do I inquire about your services?",
    a: "Select \"Business / Service Inquiry\" in the form above and describe what you need. Our team typically responds within a business day.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-surface-alt font-body">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <SectionHeading
          eyebrow="Common Questions"
          title="Before You Reach Out"
          align="center"
          className="mb-10"
        />

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-border bg-surface overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-heading text-text-strong text-sm md:text-base">
                    {faq.q}
                  </span>
                  <FaChevronDown
                    className={`shrink-0 text-brand-teal transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 text-sm text-text-muted leading-6">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
