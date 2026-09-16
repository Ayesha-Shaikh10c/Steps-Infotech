import React from "react";

const topics = [
  { icon: "▦", name: "All Posts" },
  { icon: "</>", name: "Web Development" },
  { icon: "♢", name: "Cyber Security" },
  { icon: "☁", name: "Cloud Computing" },
  { icon: "♧", name: "AI & Data" },
  { icon: "↗", name: "Digital Transformation" },
  { icon: "∞", name: "DevOps" },
  { icon: "▣", name: "Technology" },
];

const Topics = ({
  selectedTopic,
  setSelectedTopic,
}) => {
  return (
    <section
      id="topics"
      className="
        w-full bg-white px-4 py-10
        font-[Arial,Helvetica,sans-serif]

        sm:px-[5%] sm:py-[50px]
      "
    >
      <div
        className="
          mb-8 flex w-full items-center
          justify-center gap-3

          sm:mb-10
          sm:gap-5
        "
      >
        <span className="hidden h-[2px] w-[60px] bg-[#004b55] sm:block lg:w-[100px]" />

        <h2
          className="
            m-0 whitespace-nowrap
            text-[18px] font-bold
            tracking-[1px] text-[#004b55]

            sm:text-[22px]
            lg:text-[26px]
          "
        >
          BROWSE BY TOPICS
        </h2>

        <span className="hidden h-[2px] w-[60px] bg-[#004b55] sm:block lg:w-[100px]" />
      </div>

      <div
        className="
          grid w-full grid-cols-2 gap-3

          sm:grid-cols-4
          sm:gap-4

          lg:grid-cols-8
          lg:gap-[15px]
        "
      >
        {topics.map((topic) => {
          const isActive =
            selectedTopic === topic.name;

          return (
            <button
              key={topic.name}
              type="button"
              onClick={() =>
                setSelectedTopic(topic.name)
              }
              className={`
                flex h-[115px] w-full cursor-pointer
                flex-col items-center justify-center
                border text-center transition

                sm:h-[125px]
                lg:h-[130px]

                ${
                  isActive
                    ? "border-[#004b55] bg-[#004b55]"
                    : `
                      border-[#dce7e8] bg-[#f5f8f8]
                      hover:border-[#004b55]
                    `
                }
              `}
            >
              <div
                className={`
                  mb-2 flex h-10 w-10
                  items-center justify-center
                  rounded-full text-[20px]
                  font-bold transition

                  sm:h-[45px]
                  sm:w-[45px]

                  lg:mb-[10px]
                  lg:h-[50px]
                  lg:w-[50px]
                  lg:text-[23px]

                  ${
                    isActive
                      ? "bg-white text-[#004b55]"
                      : "bg-[#e1eeee] text-[#004b55]"
                  }
                `}
              >
                {topic.icon}
              </div>

              <p
                className={`
                  m-0 px-1 text-center
                  text-[11px] font-semibold

                  sm:text-[12px]
                  lg:text-[14px]

                  ${
                    isActive
                      ? "text-white"
                      : "text-[#173f44]"
                  }
                `}
              >
                {topic.name}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Topics;