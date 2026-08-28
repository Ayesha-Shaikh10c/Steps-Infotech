import React from "react";
import { Icon } from "@iconify/react";

const solutionsData = [
  {
    title: "Frontend Development",
    icon: "mdi:code-tags",
    logos: [
      { name: "HTML5", icon: "logos:html-5", type: "iconify" },
      { name: "CSS3", icon: "logos:css-3", type: "iconify" },
      { name: "JavaScript", icon: "logos:javascript", type: "iconify" },
      { name: "React", icon: "logos:react", type: "iconify" },
    ],
    description:
      "Building responsive and interactive user interfaces.",
  },

  {
    title: "Backend Development",
    icon: "mdi:server",
    logos: [
      { name: "NodeJS", icon: "logos:nodejs-icon", type: "iconify" },
      { name: "Python", icon: "logos:python", type: "iconify" },
      { name: "PHP", icon: "logos:php", type: "iconify" },
    ],
    description:
      "Robust and scalable server-side solutions for modern applications.",
  },

  {
    title: "Cloud Technologies",
    icon: "mdi:cloud-outline",
    logos: [
      { name: "AWS", icon: "logos:aws", type: "iconify" },
      { name: "Azure", icon: "logos:microsoft-azure", type: "iconify" },
      { name: "Google Cloud", icon: "logos:google-cloud", type: "iconify" },
    ],
    description:
      "Secure, flexible and cost-effective cloud solutions.",
  },

  {
    title: "Database",
    icon: "mdi:database-outline",
    logos: [
      { name: "MySQL", icon: "logos:mysql", type: "iconify" },
      { name: "PostgreSQL", icon: "logos:postgresql", type: "iconify" },
      { name: "MongoDB", icon: "logos:mongodb-icon", type: "iconify" },
    ],
    description:
      "Reliable and high-performance database management.",
  },

  {
    title: "Mobile Technologies",
    icon: "mdi:cellphone",
    logos: [
      { name: "Kotlin", icon: "logos:kotlin", type: "iconify" },
      { name: "Flutter", icon: "logos:flutter", type: "iconify" },
    ],
    description:
      "Cross-platform mobile solutions for better user experience.",
  },

  {
    title: "DevOps",
    icon: "mdi:refresh",
    logos: [
      { name: "Docker", icon: "logos:docker-icon", type: "iconify" },
      { name: "Jenkins", icon: "logos:jenkins", type: "iconify" },
      { name: "GitLab", icon: "logos:gitlab", type: "iconify" },
    ],
    description:
      "Streamlining development & operations for faster and reliable delivery.",
  },

  {
    title: "Data & Analytics",
    icon: "mdi:chart-line",
    logos: [
      { name: "Power BI", icon: "logos:microsoft-power-bi", type: "iconify" },
      { name: "Tableau", icon: "logos:tableau-icon", type: "iconify" },
      { name: "Python", icon: "logos:python", type: "iconify" },
    ],
    description:
      "Transforming data into actionable insights for smarter decisions.",
  },

  {
    title: "AI / ML",
    icon: "mdi:lightbulb-outline",
    logos: [
      { name: "TensorFlow", icon: "logos:tensorflow", type: "iconify" },
      { name: "PyTorch", icon: "logos:pytorch-icon", type: "iconify" },
      { name: "Scikit-Learn", icon: "simple-icons:scikitlearn", type: "iconify" },
    ],
    description:
      "Intelligent solutions powered by Machine Learning and AI.",
  },

  {
  title: "Cyber Security",
  icon: "mdi:shield-check-outline",
  logos: [
    {
      name: "Kali Linux",
      icon: "devicon:kalilinux",
    },
    {
      name: "Burp Suite",
      icon: "devicon:burpsuite",
    },
  ],
  description:
    "Protecting systems and data with advanced security technologies.",
},


  {
    title: "Others",
    icon: "mdi:view-grid-outline",
    logos: [
      { name: "WordPress", icon: "logos:wordpress-icon", type: "iconify" },
      { name: "Shopify", icon: "logos:shopify", type: "iconify" },
      { name: "Figma", icon: "logos:figma", type: "iconify" },
    ],
    description:
      "Building with powerful tools and platforms for your business.",
  },
];

export default function PowerSolutions() {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* HEADING */}
        <h2 className="mb-12 text-center text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Powering Solutions With Modern Technologies
        </h2>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {solutionsData.map((card, index) => (
            <div
              key={index}
              className={`flex min-h-[260px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] ${
                index === solutionsData.length - 1
                  ? "lg:col-start-2"
                  : ""
              }`}
            >

              {/* TITLE */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-teal-50">
                  <Icon
                    icon={card.icon}
                    className="h-5 w-5 text-teal-700"
                  />
                </div>

                <h3 className="text-[15px] font-bold tracking-tight text-gray-900">
                  {card.title}
                </h3>
              </div>

              {/* TECHNOLOGY LOGOS */}
              <div
                className="grid min-h-[85px] w-full items-center"
                style={{
                  gridTemplateColumns: `repeat(${card.logos.length}, minmax(0, 1fr))`,
                }}
              >
                {card.logos.map((logo, logoIndex) => (
                  <div
                    key={logoIndex}
                    className="flex h-[85px] w-full items-center justify-center"
                  >
                    {logo.type === "image" ? (
                      <img
                        src={logo.icon}
                        alt={logo.name}
                        width="58"
                        height="58"
                        className="h-[58px] w-[58px] object-contain transition-transform duration-300 hover:scale-110"
                      />
                    ) : (
                      <Icon
                        icon={logo.icon}
                        width="58"
                        height="58"
                        className="transition-transform duration-300 hover:scale-110"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* DESCRIPTION */}
              <p className="mt-auto pt-7 text-[12px] font-bold leading-6 text-gray-700">
                {card.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
