import React from "react";
import {
  FaUsers,
  FaProjectDiagram,
  FaAward,
} from "react-icons/fa";

const Statistics = () => {
  const stats = [
    {
      icon: <FaUsers />,
      number: "150+",
      title: "Happy Clients",
    },
    {
      icon: <FaProjectDiagram />,
      number: "200+",
      title: "Projects Delivered",
    },
    {
      icon: <FaAward />,
      number: "98%",
      title: "Client Satisfaction",
    },
  ];

  return (
    <section className="px-6 md:px-16 py-10">

      <div className="max-w-6xl mx-auto bg-[#dff7f9] rounded-[30px] px-8 py-7">

        <div className="grid grid-cols-1 md:grid-cols-3">

          {stats.map((stat, index) => (
            <div
              key={index}
              className={`
                flex items-center justify-center gap-5 p-4
                ${
                  index !== 0
                    ? "md:border-l border-[#67aeb3]"
                    : ""
                }
              `}
            >

              <div className="text-4xl text-black">
                {stat.icon}
              </div>

              <div>
                <h3 className="text-4xl font-bold text-[#08666b]">
                  {stat.number}
                </h3>

                <p className="text-lg font-semibold text-gray-900">
                  {stat.title}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Statistics;