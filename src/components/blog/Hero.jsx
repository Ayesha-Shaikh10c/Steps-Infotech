import React from "react";
import Blogg from "../../assets/blog/Blogg.jpg";

const Hero = () => {
  return (
    <section
      className="
        flex h-[55vh] min-h-[280px] w-full items-center
        bg-cover bg-center bg-no-repeat

        sm:h-[50vh]
        sm:min-h-[350px]

        md:h-[60vh]
        md:min-h-[420px]

        lg:max-h-[600px]
      "
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(2, 31, 39, 0.95),
            rgba(2, 31, 39, 0.45),
            rgba(2, 31, 39, 0.15)
          ),
          url(${Blogg})
        `,
      }}
    >
      <div
        className="
          mx-[5%] max-w-[700px] pr-4 text-white

          sm:mx-[7%]
          md:ml-[11%]
          md:max-w-[600px]

          lg:max-w-[700px]
        "
      >
        <span className="text-[11px] font-semibold tracking-[1px] text-[#18aaa6] sm:text-[13px]">
          OUR BLOG
        </span>

        <h1
          className="
            my-3 text-[26px] font-bold leading-[1.25]

            sm:text-[32px]
            md:text-[38px]
            lg:text-[44px]
          "
        >
          Insights. Ideas.
          <br />

          <span className="text-[#18aaa6]">
            Inspiration.
          </span>
        </h1>

        <p
          className="
            mb-4 mt-0 text-[12px]
            leading-[1.6] text-[#eeeeee]

            sm:text-[13px]
            md:text-[14px]
            lg:mb-[22px]
            lg:text-[15px]
            lg:leading-[1.7]
          "
        >
          Explore expert insights, industry trends and practical guides
          <br className="hidden sm:block" />
          {" "}
          to help you stay ahead in the digital world.
        </p>

        <button
          onClick={() => {
            document
              .getElementById("articles")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
          className="
            cursor-pointer rounded-[7px]
            border-none bg-[#18aaa6]
            px-4 py-3 text-[13px]
            font-semibold text-white
            transition duration-300
            hover:bg-[#108d8a]

            sm:px-5 sm:text-[14px]
            lg:px-[22px] lg:py-[15px]
            lg:text-[16px]
          "
        >
          Explore Articles →
        </button>
      </div>
    </section>
  );
};

export default Hero;