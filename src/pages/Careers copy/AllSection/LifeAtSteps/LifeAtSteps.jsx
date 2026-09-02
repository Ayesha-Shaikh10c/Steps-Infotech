import Third from "../../../../assets/Images/Third.png";
import Fourth from "../../../../assets/Images/Fourth.png";
import Five from "../../../../assets/Images/Five.png";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

/* =========================================================
   FAQ DATA
========================================================= */

const faqs = [
  {
    question: "How can I apply a job at Steps Infotech?",
    answer:
      "You can apply for a job by visiting the Open Positions section, selecting the position that matches your skills, and clicking the Apply Now button.",
  },
  {
    question: "Is internship at Steps Infotech paid?",
    answer:
      "Internship opportunities may vary depending on the program and role. The internship details, eligibility and applicable terms are provided during the application process.",
  },
  {
    question: "Can freshers apply for jobs?",
    answer:
      "Yes. Freshers can apply for suitable positions where the required skills and eligibility criteria match their educational background and knowledge.",
  },
  {
    question: "What technologies do you work on?",
    answer:
      "We work with modern technologies including Java, JavaScript, React, databases, cloud technologies, data analytics and cyber security.",
  },
];

/* =========================================================
   CULTURE DATA
========================================================= */

const cultureData = [
  {
    title: "Open Culture",
    description:
      "We believe in open communication, respect and creating an environment where every team member can share ideas freely.",
  },
  {
    title: "Innovation",
    description:
      "We encourage new ideas, creative thinking and continuous improvement to build better technology solutions.",
  },
  {
    title: "Teamwork",
    description:
      "We work together, share knowledge and support each other to achieve common goals.",
  },
  {
    title: "Growth",
    description:
      "We provide opportunities to learn new skills, take responsibilities and grow professionally.",
  },
];

function LifeAtSteps() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeCulture, setActiveCulture] = useState(null);

  /* =======================================================
     FAQ TOGGLE
  ======================================================= */

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  /* =======================================================
     CULTURE TOGGLE
  ======================================================= */

  const toggleCulture = (index) => {
    setActiveCulture(
      activeCulture === index ? null : index
    );
  };

  return (
    <section className="w-full bg-white py-12 sm:py-14 md:py-16">
      <div
        className="
          w-[90%]
          max-w-[1180px]
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
          lg:gap-10
          items-start
        "
      >

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="w-full">

          {/* ================= BUILDING IMAGE ================= */}

          <div
            className="
              w-full
              h-[260px]
              sm:h-[300px]
              md:h-[340px]
              lg:h-[360px]
              overflow-hidden
              rounded-xl
              shadow-[0_5px_15px_rgba(0,0,0,0.15)]
            "
          >
            <img
              src={Third}
              alt="Steps Infotech Building"
              className="
                w-full
                h-full
                object-cover
                object-center
              "
            />
          </div>

          {/* ================= FAQ HEADING ================= */}

          <div
            className="
              mt-8
              mb-5
              text-[12px]
              sm:text-[13px]
              font-extrabold
              tracking-[1px]
              text-[#0f9fa3]
            "
          >
            FREQUENTLY ASKED QUESTIONS
          </div>

          {/* ================= FAQ IMAGES ================= */}

          <div
            className="
              grid
              grid-cols-2
              gap-4
            "
          >

            <div
              className="
                w-full
                h-[150px]
                sm:h-[180px]
                md:h-[200px]
                overflow-hidden
                rounded-xl
                shadow-[0_5px_14px_rgba(0,0,0,0.15)]
              "
            >
              <img
                src={Fourth}
                alt="Steps Infotech Team"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            </div>

            <div
              className="
                w-full
                h-[150px]
                sm:h-[180px]
                md:h-[200px]
                overflow-hidden
                rounded-xl
                shadow-[0_5px_14px_rgba(0,0,0,0.15)]
              "
            >
              <img
                src={Five}
                alt="Steps Infotech Employee"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            </div>

          </div>
        </div>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="w-full">

          {/* =================================================
              LIFE AT STEPS CARD
          ================================================= */}

          <div
            className="
              w-full
              bg-white
              border
              border-gray-200
              rounded-xl
              p-5
              sm:p-6
              md:p-7
              shadow-[0_5px_15px_rgba(0,0,0,0.12)]
            "
          >

            {/* TAG */}

            <span
              className="
                inline-block
                mb-2
                text-[12px]
                sm:text-[13px]
                font-extrabold
                tracking-[1px]
                text-[#0f9fa3]
              "
            >
              LIFE AT STEPS INFOTECH
            </span>


            {/* TITLE */}

            <h2
              className="
                m-0
                mb-3
                text-[24px]
                sm:text-[27px]
                md:text-[30px]
                font-extrabold
                leading-tight
                text-[#111827]
              "
            >
              More Than Just a Workplace
            </h2>


            {/* DESCRIPTION */}

            <p
              className="
                m-0
                min-h-[72px]
                text-[13px]
                sm:text-[14px]
                leading-6
                font-medium
                text-[#64748b]
              "
            >
              {activeCulture === null ? (
                <>
                  Our culture is built on trust, respect and collaboration.
                  <br className="hidden sm:block" />

                  We encourage innovation and provide a positive environment
                  <br className="hidden md:block" />

                  where you can do your best work every day.
                </>
              ) : (
                cultureData[activeCulture].description
              )}
            </p>


            {/* CULTURE BUTTONS */}

            <div
              className="
                flex
                flex-wrap
                gap-2
                mt-6
              "
            >
              {cultureData.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleCulture(index)}
                  className={`
                    px-4
                    py-2
                    rounded-md
                    border
                    text-[11px]
                    sm:text-[12px]
                    font-bold
                    transition-all
                    duration-200
                    ${
                      activeCulture === index
                        ? "bg-[#0f9fa3] border-[#0f9fa3] text-white"
                        : "bg-white border-gray-200 text-[#334155] hover:border-[#0f9fa3] hover:text-[#0f9fa3]"
                    }
                  `}
                >
                  {item.title}
                </button>
              ))}
            </div>

          </div>


          {/* =================================================
              FAQ BOX
          ================================================= */}

          <div
            className="
              w-full
              mt-6
              bg-white
              border
              border-gray-200
              rounded-xl
              overflow-hidden
              shadow-[0_5px_15px_rgba(0,0,0,0.10)]
            "
          >

            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`
                  border-b
                  border-gray-200
                  last:border-b-0
                  transition-all
                  duration-200
                  ${
                    activeFaq === index
                      ? "bg-[#f8fafc]"
                      : "bg-white"
                  }
                `}
              >

                {/* ================= QUESTION ================= */}

                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={activeFaq === index}
                  className="
                    w-full
                    min-h-[58px]
                    px-4
                    sm:px-5
                    flex
                    items-center
                    justify-between
                    gap-4
                    text-left
                    bg-transparent
                    border-0
                    cursor-pointer
                  "
                >

                  <span
                    className={`
                      text-[12px]
                      sm:text-[13px]
                      font-bold
                      leading-5
                      ${
                        activeFaq === index
                          ? "text-[#0f9fa3]"
                          : "text-[#1e293b]"
                      }
                    `}
                  >
                    {faq.question}
                  </span>


                  {/* ICON */}

                  <span
                    className="
                      flex
                      shrink-0
                      items-center
                      justify-center
                      w-6
                      h-6
                      rounded-full
                      bg-[#e6f7f7]
                      text-[#0f9fa3]
                      text-[10px]
                    "
                  >
                    {activeFaq === index ? (
                      <FaMinus />
                    ) : (
                      <FaPlus />
                    )}
                  </span>

                </button>


                {/* ================= ANSWER ================= */}

                {activeFaq === index && (
                  <div
                    className="
                      px-4
                      sm:px-5
                      pb-5
                    "
                  >
                    <p
                      className="
                        m-0
                        pt-1
                        text-[11px]
                        sm:text-[12px]
                        leading-5
                        text-[#64748b]
                        font-medium
                      "
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

export default LifeAtSteps;