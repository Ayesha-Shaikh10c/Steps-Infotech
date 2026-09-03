import {
  FaJava,
  FaCode,
  FaPalette,
  FaChartBar,
  FaShieldAlt,
  FaCloud,
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
  FaCheckCircle,
} from "react-icons/fa";

/* =========================================================
   JOB DATA
========================================================= */

const jobs = {
  1: {
    title: "Java Developer",
    icon: <FaJava />,
    experience: "0–2 Years",
    location: "Pune",
    employment: "Full Time",
    skills: "Java, Spring Boot, SQL",

    description:
      "We are looking for a Java Developer to join our development team and work on real-world software applications.",

    responsibilities: [
      "Develop and maintain Java applications.",
      "Work with Spring Boot and backend technologies.",
      "Write clean and maintainable code.",
      "Work with SQL databases.",
      "Debug and fix application issues.",
      "Collaborate with other team members.",
    ],

    requirements: [
      "Basic knowledge of Core Java.",
      "Understanding of OOP concepts.",
      "Basic knowledge of SQL.",
      "Knowledge of Spring Boot is an advantage.",
      "Good problem-solving skills.",
    ],
  },

  2: {
    title: "Frontend Developer",
    icon: <FaCode />,
    experience: "0–2 Years",
    location: "Pune",
    employment: "Full Time",
    skills: "HTML, CSS, JavaScript",

    description:
      "We are looking for a Frontend Developer who can create responsive and user-friendly web interfaces.",

    responsibilities: [
      "Develop responsive web pages.",
      "Write clean HTML and CSS.",
      "Implement JavaScript functionality.",
      "Work with reusable UI components.",
      "Optimize website performance.",
      "Collaborate with designers and backend developers.",
    ],

    requirements: [
      "Good knowledge of HTML and CSS.",
      "Basic knowledge of JavaScript.",
      "Understanding of responsive design.",
      "Knowledge of React is an advantage.",
      "Good attention to detail.",
    ],
  },

  3: {
    title: "UI/UX Designer",
    icon: <FaPalette />,
    experience: "1+ Years",
    location: "Pune / Remote",
    employment: "Full Time",
    skills: "Figma, Adobe XD",

    description:
      "We are looking for a creative UI/UX Designer to design simple, attractive and user-friendly digital experiences.",

    responsibilities: [
      "Create website and application designs.",
      "Prepare wireframes and prototypes.",
      "Create responsive UI designs.",
      "Work with developers to implement designs.",
      "Improve user experience.",
      "Maintain design consistency.",
    ],

    requirements: [
      "Good knowledge of Figma.",
      "Understanding of UI/UX principles.",
      "Knowledge of wireframing and prototyping.",
      "Good visual design skills.",
      "Creative problem-solving ability.",
    ],
  },

  4: {
    title: "Data Analyst",
    icon: <FaChartBar />,
    experience: "0–2 Years",
    location: "Pune",
    employment: "Full Time",
    skills: "SQL, Power BI, Excel, Python",

    description:
      "We are looking for a Data Analyst to analyze data and provide meaningful insights to support business decisions.",

    responsibilities: [
      "Collect and analyze business data.",
      "Write SQL queries.",
      "Prepare reports and dashboards.",
      "Work with Excel and Power BI.",
      "Identify trends and patterns.",
      "Present meaningful insights.",
    ],

    requirements: [
      "Basic knowledge of SQL.",
      "Knowledge of Excel.",
      "Basic understanding of data analysis.",
      "Power BI knowledge is an advantage.",
      "Basic Python knowledge is an advantage.",
    ],
  },

  5: {
    title: "Cyber Security",
    icon: <FaShieldAlt />,
    experience: "1–3 Years",
    location: "Pune",
    employment: "Full Time",
    skills: "Cyber Security, Networking, Security Tools",

    description:
      "We are looking for a Cyber Security professional to help protect applications, systems and infrastructure.",

    responsibilities: [
      "Monitor security events.",
      "Identify potential security risks.",
      "Assist with security testing.",
      "Monitor application and infrastructure security.",
      "Work with security tools.",
      "Prepare security reports.",
    ],

    requirements: [
      "Basic knowledge of networking.",
      "Understanding of cyber security concepts.",
      "Knowledge of common security threats.",
      "Basic knowledge of cloud security.",
      "Good analytical skills.",
    ],
  },

  6: {
    title: "Cloud Computing",
    icon: <FaCloud />,
    experience: "0–2 Years",
    location: "Pune",
    employment: "Full Time",
    skills: "Cloud Computing, AWS, Docker",

    description:
      "We are looking for a Cloud Computing professional interested in working with cloud-based technologies and infrastructure.",

    responsibilities: [
      "Assist with cloud infrastructure management.",
      "Monitor cloud applications and services.",
      "Support deployment activities.",
      "Work with cloud-based systems.",
      "Monitor application performance.",
      "Assist the technical team with cloud operations.",
    ],

    requirements: [
      "Basic knowledge of cloud computing.",
      "Understanding of networking fundamentals.",
      "Basic knowledge of databases.",
      "Good troubleshooting skills.",
      "Willingness to learn cloud technologies.",
    ],
  },
};

/* =========================================================
   JOB DETAILS COMPONENT
========================================================= */

function JobDetails({ jobId = 1 }) {
  const job = jobs[jobId] || jobs[1];

  return (
    <section className="w-full min-h-[70vh] bg-slate-50 px-5 py-[60px] box-border">

      <div className="w-[92%] max-w-[1150px] mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex items-center gap-[22px]
            bg-white p-[30px]
            rounded-[10px]
            shadow-[0_4px_15px_rgba(0,0,0,0.10)]
            mb-[25px]
            box-border

            max-[600px]:flex-col
            max-[600px]:items-center
            max-[600px]:text-center
            max-[600px]:gap-4
            max-[600px]:p-[22px]

            max-[380px]:p-[19px]
          "
        >

          {/* ICON */}

          <div
            className="
              w-[70px] h-[70px]
              shrink-0
              flex items-center justify-center
              rounded-full
              bg-[#079c9c]
              text-white
              text-[34px]

              max-[600px]:w-[60px]
              max-[600px]:h-[60px]
              max-[600px]:text-[27px]

              max-[380px]:w-[55px]
              max-[380px]:h-[55px]
              max-[380px]:text-[24px]
            "
          >
            {job.icon}
          </div>

          {/* TITLE */}

          <div className="min-w-0 max-[600px]:w-full">

            <span
              className="
                block
                mb-[5px]
                text-[#079c9c]
                text-xs
                font-bold
                tracking-[0.5px]

                max-[600px]:text-[11px]
              "
            >
              OPEN POSITION
            </span>

            <h1
              className="
                m-0
                mb-3
                text-[#172033]
                text-[32px]
                leading-[1.2]
                font-extrabold

                max-[600px]:text-[25px]
                max-[600px]:mb-[13px]

                max-[380px]:text-[23px]
              "
            >
              {job.title}
            </h1>

            {/* META */}

            <div
              className="
                flex items-center flex-wrap
                gap-x-[22px] gap-y-2

                max-[600px]:justify-center
                max-[600px]:gap-x-[18px]
                max-[600px]:gap-y-3

                max-[380px]:flex-col
                max-[380px]:items-center
                max-[380px]:gap-2
              "
            >

              {/* LOCATION */}

              <div
                className="
                  flex items-center gap-[7px]
                  text-[#6b7280]
                  text-[13px]
                  font-medium

                  max-[600px]:text-xs
                "
              >
                <FaMapMarkerAlt className="shrink-0 text-[#079c9c] text-sm" />
                <span>{job.location}</span>
              </div>

              {/* EXPERIENCE */}

              <div
                className="
                  flex items-center gap-[7px]
                  text-[#6b7280]
                  text-[13px]
                  font-medium

                  max-[600px]:text-xs
                "
              >
                <FaClock className="shrink-0 text-[#079c9c] text-sm" />
                <span>{job.experience}</span>
              </div>

              {/* EMPLOYMENT */}

              <div
                className="
                  flex items-center gap-[7px]
                  text-[#6b7280]
                  text-[13px]
                  font-medium

                  max-[600px]:text-xs
                "
              >
                <FaBriefcase className="shrink-0 text-[#079c9c] text-sm" />
                <span>{job.employment}</span>
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="
            grid
            grid-cols-[1fr_320px]
            gap-[25px]
            items-start

            max-[900px]:grid-cols-1
          "
        >

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div
            className="
              bg-white
              p-[30px]
              rounded-[10px]
              shadow-[0_4px_15px_rgba(0,0,0,0.10)]
              box-border

              max-[600px]:p-[22px]

              max-[380px]:p-[19px]
            "
          >

            {/* JOB DESCRIPTION */}

            <div className="mb-[30px] last:mb-0">

              <h2
                className="
                  m-0
                  mb-3
                  text-[#172033]
                  text-[21px]
                  leading-[1.3]
                  font-bold

                  after:content-['']
                  after:block
                  after:w-10
                  after:h-[3px]
                  after:mt-[7px]
                  after:bg-[#079c9c]
                  after:rounded-[3px]

                  max-[600px]:text-[19px]

                  max-[380px]:text-lg
                "
              >
                Job Description
              </h2>

              <p
                className="
                  m-0
                  text-[#606a7b]
                  text-sm
                  leading-[1.8]

                  max-[600px]:text-[13px]

                  max-[380px]:text-[12.5px]
                "
              >
                {job.description}
              </p>

            </div>

            {/* RESPONSIBILITIES */}

            <div className="mb-[30px]">

              <h2
                className="
                  m-0
                  mb-3
                  text-[#172033]
                  text-[21px]
                  leading-[1.3]
                  font-bold

                  after:content-['']
                  after:block
                  after:w-10
                  after:h-[3px]
                  after:mt-[7px]
                  after:bg-[#079c9c]
                  after:rounded-[3px]

                  max-[600px]:text-[19px]

                  max-[380px]:text-lg
                "
              >
                Responsibilities
              </h2>

              <ul className="m-0 p-0 list-none">

                {job.responsibilities.map((item, index) => (
                  <li
                    key={index}
                    className="
                      flex items-start
                      gap-[10px]
                      mb-[11px]
                      text-[#606a7b]
                      text-sm
                      leading-[1.6]

                      last:mb-0

                      max-[600px]:text-[13px]

                      max-[380px]:text-[12.5px]
                    "
                  >
                    <FaCheckCircle
                      className="
                        shrink-0
                        mt-1
                        text-[#079c9c]
                        text-[13px]
                      "
                    />

                    <span>{item}</span>
                  </li>
                ))}

              </ul>

            </div>

            {/* REQUIREMENTS */}

            <div>

              <h2
                className="
                  m-0
                  mb-3
                  text-[#172033]
                  text-[21px]
                  leading-[1.3]
                  font-bold

                  after:content-['']
                  after:block
                  after:w-10
                  after:h-[3px]
                  after:mt-[7px]
                  after:bg-[#079c9c]
                  after:rounded-[3px]

                  max-[600px]:text-[19px]

                  max-[380px]:text-lg
                "
              >
                Requirements
              </h2>

              <ul className="m-0 p-0 list-none">

                {job.requirements.map((item, index) => (
                  <li
                    key={index}
                    className="
                      flex items-start
                      gap-[10px]
                      mb-[11px]
                      text-[#606a7b]
                      text-sm
                      leading-[1.6]

                      last:mb-0

                      max-[600px]:text-[13px]

                      max-[380px]:text-[12.5px]
                    "
                  >
                    <FaCheckCircle
                      className="
                        shrink-0
                        mt-1
                        text-[#079c9c]
                        text-[13px]
                      "
                    />

                    <span>{item}</span>
                  </li>
                ))}

              </ul>

            </div>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside
            className="
              sticky
              top-[110px]

              max-[900px]:static
            "
          >

            {/* JOB OVERVIEW */}

            <div
              className="
                bg-white
                p-[25px]
                rounded-[10px]
                shadow-[0_4px_15px_rgba(0,0,0,0.10)]
                mb-[15px]
                box-border

                max-[600px]:p-[22px]
              "
            >

              <h3
                className="
                  m-0
                  mb-5
                  text-[#172033]
                  text-xl
                  leading-[1.3]
                  font-bold

                  max-[600px]:text-[19px]
                "
              >
                Job Overview
              </h3>

              {/* POSITION */}

              <div
                className="
                  flex flex-col gap-1
                  py-3
                  border-b
                  border-[#edf0f4]
                  first:pt-0
                  last:border-b-0
                  last:pb-0
                "
              >
                <span className="text-[#7a8290] text-[11px] font-semibold">
                  Position
                </span>

                <strong className="text-[#172033] text-[13px] font-semibold leading-[1.5] break-words">
                  {job.title}
                </strong>
              </div>

              {/* EXPERIENCE */}

              <div
                className="
                  flex flex-col gap-1
                  py-3
                  border-b
                  border-[#edf0f4]
                "
              >
                <span className="text-[#7a8290] text-[11px] font-semibold">
                  Experience
                </span>

                <strong className="text-[#172033] text-[13px] font-semibold leading-[1.5] break-words">
                  {job.experience}
                </strong>
              </div>

              {/* LOCATION */}

              <div
                className="
                  flex flex-col gap-1
                  py-3
                  border-b
                  border-[#edf0f4]
                "
              >
                <span className="text-[#7a8290] text-[11px] font-semibold">
                  Location
                </span>

                <strong className="text-[#172033] text-[13px] font-semibold leading-[1.5] break-words">
                  {job.location}
                </strong>
              </div>

              {/* EMPLOYMENT */}

              <div
                className="
                  flex flex-col gap-1
                  py-3
                  border-b
                  border-[#edf0f4]
                "
              >
                <span className="text-[#7a8290] text-[11px] font-semibold">
                  Employment
                </span>

                <strong className="text-[#172033] text-[13px] font-semibold leading-[1.5] break-words">
                  {job.employment}
                </strong>
              </div>

              {/* SKILLS */}

              <div className="flex flex-col gap-1 pt-3">

                <span className="text-[#7a8290] text-[11px] font-semibold">
                  Skills
                </span>

                <strong className="text-[#172033] text-[13px] font-semibold leading-[1.5] break-words">
                  {job.skills}
                </strong>

              </div>

            </div>

            {/* APPLY BUTTON */}

            <a
              href={`/job-application?position=${encodeURIComponent(
                job.title
              )}`}
              className="
                w-full
                h-[45px]
                flex items-center justify-center
                box-border
                rounded-[6px]
                bg-[#079c9c]
                text-white
                no-underline
                text-sm
                font-semibold
                transition-all
                duration-300

                hover:bg-[#067c7e]
                hover:-translate-y-0.5
                hover:shadow-[0_5px_12px_rgba(7,156,156,0.25)]
              "
            >
              Apply Now →
            </a>

            {/* BACK TO CAREERS */}

            <a
              href="Careers"
              className="
                block
                mt-[15px]
                text-center
                text-[#079c9c]
                no-underline
                text-[13px]
                font-semibold
                transition-all
                duration-300

                hover:text-[#067c7e]
                hover:underline
              "
            >
              ← Back to Careers
            </a>

          </aside>

        </div>

      </div>

    </section>
  );
}

export default JobDetails;