import React from "react";
import {
  Lightbulb,
  Headphones,
  BarChart3,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function WhyChooseUs() {
  const items = [
    {
      title: "Innovative Solutions",
      text:
        "We leverage the latest technologies and creative thinking to build future-ready solutions.",
      icon: Lightbulb,
      link: "/solutions",
    },

    {
      title: "Dedicated Support",
      text:
        "Our support team is always available to ensure smooth operations and client satisfaction.",
      icon: Headphones,
      link: "/services"
    },

    {
      title: "Results - Driven",
      text:
        "We focus on delivering measurable outcomes that help businesses grow and succeed.",
      icon: BarChart3,
      link: "/portfolio",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1260px] px-[40px] pt-[30px] pb-[40px]">

      {/* ================= HEADING ================= */}

      <div className="text-center">

        <h2 className="text-[38px] font-bold text-[#173f55]">
          What Sets Us Apart
        </h2>

        <div className="mx-auto mt-[20px] h-[4px] w-[80px] rounded-full bg-[#31979a]" />

      </div>


      {/* ================= CARDS ================= */}

      <div className="mt-[50px] grid grid-cols-1 gap-[30px] md:grid-cols-3">

        {items.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                group
                min-h-[395px]
                rounded-[28px]
                border
                border-[#dce8e8]
                bg-white
                px-[35px]
                py-[36px]

                shadow-[0_8px_20px_rgba(0,0,0,0.08)]

                transition-all
                duration-300
                ease-out

                hover:-translate-y-[10px]
                hover:scale-[1.02]
                hover:border-[#a8f3f3]
                hover:shadow-[0_18px_35px_rgba(0,0,0,0.16)]
              "
            >

              {/* ================= ICON ================= */}

              <div
                className="
                  flex
                  h-[76px]
                  w-[76px]
                  items-center
                  justify-center
                  rounded-[17px]
                  bg-[#a8f3f3]

                  transition-all
                  duration-300

                  group-hover:scale-110
                "
              >
                <Icon
                  size={38}
                  strokeWidth={1.8}
                  className="text-[#299294]"
                />
              </div>


              {/* ================= TITLE ================= */}

              <h3 className="mt-[31px] text-[24px] font-bold text-[#173f55]">
                {item.title}
              </h3>


              {/* ================= LINE ================= */}

              <div
                className="
                  mt-[13px]
                  h-[3px]
                  w-[56px]
                  rounded-full
                  bg-[#31979a]

                  transition-all
                  duration-300

                  group-hover:w-[70px]
                "
              />


              {/* ================= DESCRIPTION ================= */}

              <p className="mt-[27px] text-[18px] leading-[1.65] text-[#344957]">
                {item.text}
              </p>


              {/* ================= LEARN MORE ================= */}

              <Link
                to={item.link}
                className="
                  mt-[30px]
                  inline-flex
                  items-center
                  gap-[12px]

                  text-[17px]
                  font-bold
                  text-[#298d91]

                  transition-all
                  duration-300

                  hover:gap-[17px]
                  hover:text-[#176e74]
                "
              >
                Learn more

                <ArrowRight
                  size={21}
                  strokeWidth={2.5}
                />
              </Link>

            </div>
          );
        })}

      </div>

    </section>
  );
}