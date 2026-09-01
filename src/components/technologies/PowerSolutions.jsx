import React, { useState } from "react";
import { Icon } from "@iconify/react";

const solutionsData = [
  {
    title: "Frontend Development",
    icon: "mdi:code-tags",
    info: "Frontend Development focuses on creating the visual and interactive part of websites and web applications.",
    roadmap: [
      "Learn HTML5 and semantic page structure",
      "Master CSS3, Flexbox and Grid",
      "Learn JavaScript fundamentals and DOM manipulation",
      "Build responsive websites",
      "Learn React and component-based development",
      "Master Tailwind CSS and modern frontend tools",
      "Build real-world projects",
    ],
    logos: [
      { name: "HTML5", icon: "logos:html-5" },
      { name: "CSS3", icon: "logos:css-3" },
      { name: "JavaScript", icon: "logos:javascript" },
      { name: "React", icon: "logos:react" },
    ],
    description: "Building responsive and interactive user interfaces.",
  },

  {
    title: "Backend Development",
    icon: "mdi:server",
    info: "Backend Development handles server-side logic, APIs, authentication and communication with databases.",
    roadmap: [
      "Understand programming fundamentals",
      "Learn Node.js, Python, Java or PHP",
      "Understand HTTP and REST APIs",
      "Learn authentication and authorization",
      "Connect applications with databases",
      "Build secure APIs",
      "Deploy a complete backend project",
    ],
    logos: [
      { name: "NodeJS", icon: "logos:nodejs-icon" },
      { name: "Python", icon: "logos:python" },
      { name: "PHP", icon: "logos:php" },
    ],
    description: "Robust and scalable server-side solutions for modern applications.",
  },

  {
    title: "Cloud Technologies",
    icon: "mdi:cloud-outline",
    info: "Cloud computing provides scalable infrastructure, storage and services through the internet.",
    roadmap: [
      "Understand cloud computing fundamentals",
      "Learn networking and Linux basics",
      "Explore AWS, Azure or Google Cloud",
      "Learn cloud storage and compute services",
      "Understand security and IAM",
      "Deploy applications to the cloud",
    ],
    logos: [
      { name: "AWS", icon: "logos:aws" },
      { name: "Azure", icon: "logos:microsoft-azure" },
      { name: "Google Cloud", icon: "logos:google-cloud" },
    ],
    description: "Secure, flexible and cost-effective cloud solutions.",
  },

  {
    title: "Database",
    icon: "mdi:database-outline",
    info: "Databases store, organize and manage application data efficiently and securely.",
    roadmap: [
      "Learn database fundamentals",
      "Understand tables, keys and relationships",
      "Master SQL queries",
      "Learn PostgreSQL or MySQL",
      "Understand normalization and indexing",
      "Explore MongoDB and NoSQL databases",
      "Build database-driven applications",
    ],
    logos: [
      { name: "MySQL", icon: "logos:mysql" },
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "MongoDB", icon: "logos:mongodb-icon" },
    ],
    description: "Reliable and high-performance database management.",
  },

  {
    title: "Mobile Technologies",
    icon: "mdi:cellphone",
    info: "Mobile development focuses on building applications for Android and iOS devices.",
    roadmap: [
      "Learn programming fundamentals",
      "Understand mobile UI principles",
      "Choose Flutter, Kotlin or React Native",
      "Build mobile screens and navigation",
      "Connect with APIs and databases",
      "Test applications on devices",
      "Publish a complete application",
    ],
    logos: [
      { name: "Kotlin", icon: "logos:kotlin" },
      { name: "Flutter", icon: "logos:flutter" },
    ],
    description: "Cross-platform mobile solutions for better user experience.",
  },

  {
    title: "DevOps",
    icon: "mdi:refresh",
    info: "DevOps combines development and operations practices to automate software building, testing and deployment.",
    roadmap: [
      "Learn Linux and command-line basics",
      "Master Git and version control",
      "Learn Docker and containers",
      "Understand CI/CD pipelines",
      "Explore cloud deployment",
      "Learn monitoring and automation",
    ],
    logos: [
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "Jenkins", icon: "logos:jenkins" },
      { name: "GitLab", icon: "logos:gitlab" },
    ],
    description: "Streamlining development & operations for faster and reliable delivery.",
  },

  {
    title: "Data & Analytics",
    icon: "mdi:chart-line",
    info: "Data Analytics transforms raw data into meaningful insights that support better business decisions.",
    roadmap: [
      "Learn Excel and data fundamentals",
      "Learn SQL for data analysis",
      "Learn Python basics",
      "Study Pandas and NumPy",
      "Create visualizations",
      "Learn Power BI or Tableau",
      "Build data analysis projects",
    ],
    logos: [
      { name: "Power BI", icon: "logos:microsoft-power-bi" },
      { name: "Tableau", icon: "logos:tableau-icon" },
      { name: "Python", icon: "logos:python" },
    ],
    description: "Transforming data into actionable insights for smarter decisions.",
  },

  {
    title: "AI / ML",
    icon: "mdi:lightbulb-outline",
    info: "Artificial Intelligence and Machine Learning enable computers to learn patterns and make intelligent predictions.",
    roadmap: [
      "Learn Python programming",
      "Understand mathematics and statistics basics",
      "Learn NumPy and Pandas",
      "Study data preprocessing",
      "Learn Scikit-learn and ML algorithms",
      "Explore TensorFlow or PyTorch",
      "Build AI and ML projects",
    ],
    logos: [
      { name: "TensorFlow", icon: "logos:tensorflow" },
      { name: "PyTorch", icon: "logos:pytorch-icon" },
      { name: "Scikit-Learn", icon: "simple-icons:scikitlearn" },
    ],
    description: "Intelligent solutions powered by Machine Learning and AI.",
  },

  {
    title: "Cyber Security",
    icon: "mdi:shield-check-outline",
    info: "Cyber Security focuses on protecting systems, networks and data from digital threats and attacks.",
    roadmap: [
      "Learn networking fundamentals",
      "Understand Linux and operating systems",
      "Study cybersecurity fundamentals",
      "Learn ethical hacking concepts",
      "Explore Kali Linux and security tools",
      "Practice web application security",
      "Build cybersecurity projects in legal labs",
    ],
    logos: [
      { name: "Kali Linux", icon: "devicon:kalilinux" },
      { name: "Burp Suite", icon: "devicon:burpsuite" },
    ],
    description: "Protecting systems and data with advanced security technologies.",
  },

  {
    title: "Others",
    icon: "mdi:view-grid-outline",
    info: "Explore additional platforms and tools used to design, build and manage modern digital products.",
    roadmap: [
      "Understand the purpose of each platform",
      "Learn basic design principles",
      "Explore Figma for UI/UX",
      "Learn WordPress or Shopify",
      "Build practical projects",
      "Create a professional portfolio",
    ],
    logos: [
      { name: "WordPress", icon: "logos:wordpress-icon" },
      { name: "Shopify", icon: "logos:shopify" },
      { name: "Figma", icon: "logos:figma" },
    ],
    description: "Building with powerful tools and platforms for your business.",
  },
];

export default function PowerSolutions() {
  const [selectedTechnology, setSelectedTechnology] = useState(null);

  return (
    <>
      {/* ================= TECHNOLOGY CARDS ================= */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">

          <h2 className="mb-12 text-center text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Powering Solutions With Modern Technologies
          </h2>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {solutionsData.map((card, index) => (
              <button
                key={card.title}
                onClick={() => setSelectedTechnology(card)}
                className={`flex min-h-[260px] flex-col rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-[0_8px_30px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  index === solutionsData.length - 1 ? "lg:col-start-2" : ""
                }`}
              >
                {/* TITLE */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-teal-50">
                    <Icon icon={card.icon} className="h-5 w-5 text-teal-700" />
                  </div>

                  <h3 className="text-[15px] font-bold tracking-tight text-gray-900">
                    {card.title}
                  </h3>
                </div>

                {/* LOGOS */}
                <div
                  className="grid min-h-[85px] w-full items-center"
                  style={{
                    gridTemplateColumns: `repeat(${card.logos.length}, minmax(0, 1fr))`,
                  }}
                >
                  {card.logos.map((logo) => (
                    <div
                      key={logo.name}
                      className="flex h-[85px] items-center justify-center"
                    >
                      <Icon
                        icon={logo.icon}
                        width="58"
                        height="58"
                        className="transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>

                <p className="mt-auto pt-7 text-[12px] font-bold leading-6 text-gray-700">
                  {card.description}
                </p>

                <span className="mt-4 text-xs font-bold text-teal-700">
                  Explore Roadmap →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DETAILS MODAL ================= */}
      {selectedTechnology && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-10">

            {/* Close Button */}
            <button
              onClick={() => setSelectedTechnology(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-gray-600 transition hover:bg-red-50 hover:text-red-500"
              aria-label="Close"
            >
              ×
            </button>

            {/* Modal Heading */}
            <div className="pr-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                  <Icon
                    icon={selectedTechnology.icon}
                    className="h-7 w-7 text-teal-700"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold tracking-widest text-teal-700">
                    TECHNOLOGY ROADMAP
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                    {selectedTechnology.title}
                  </h2>
                </div>
              </div>

              <p className="mt-6 leading-7 text-gray-600">
                {selectedTechnology.info}
              </p>
            </div>

            {/* Study Plan */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900">
                Your Study Plan
              </h3>

              <div className="mt-5 space-y-4">
                {selectedTechnology.roadmap.map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
                      {index + 1}
                    </div>

                    <p className="pt-1 text-sm leading-6 text-gray-600">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="text-sm font-bold text-gray-900">
                Technologies You'll Explore
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {selectedTechnology.logos.map((logo) => (
                  <div
                    key={logo.name}
                    className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2"
                  >
                    <Icon icon={logo.icon} className="h-5 w-5" />
                    <span className="text-xs font-semibold text-gray-700">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}