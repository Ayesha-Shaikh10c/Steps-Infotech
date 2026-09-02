import {
  FaJava,
  FaCode,
  FaPalette,
  FaChartBar,
  FaShieldAlt,
  FaCloud,
} from "react-icons/fa";


/* =========================================================
   JOB DATA
========================================================= */

const jobs = [
  {
    id: 1,
    title: "Java Developer",
    icon: <FaJava />,
    experience: "0–2 Years",
    location: "Pune",
    employment: "Full Time",
    skills: "Java, Spring Boot, SQL",
  },
  {
    id: 2,
    title: "Frontend Developer",
    icon: <FaCode />,
    experience: "0–2 Years",
    location: "Pune",
    employment: "Full Time",
    skills: "HTML, CSS, JavaScript",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    icon: <FaPalette />,
    experience: "1+ Years",
    location: "Pune / Remote",
    employment: "Full Time",
    skills: "Figma, Adobe XD",
  },
  {
    id: 4,
    title: "Data Analyst",
    icon: <FaChartBar />,
    experience: "0–2 Years",
    location: "Pune",
    employment: "Full Time",
    skills: "SQL, Power BI, Excel, Python",
  },
  {
    id: 5,
    title: "Cyber Security",
    icon: <FaShieldAlt />,
    experience: "1–3 Years",
    location: "Pune",
    employment: "Full Time",
    skills: "Cyber Security, Networking",
  },
  {
    id: 6,
    title: "Cloud Computing",
    icon: <FaCloud />,
    experience: "0–2 Years",
    location: "Pune",
    employment: "Full Time",
    skills: "Cloud, Networking, Databases",
  },
];


function OpenPositions({ onJobDetails }) {

  /* =======================================================
     VIEW ALL OPENINGS
  ======================================================= */

  const viewAllOpenings = () => {
    document
      .getElementById("open-positions")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };


  return (
    <section
      id="open-positions"
      className="
        w-full
        bg-white
        px-4
        sm:px-5
        py-[50px]
        sm:py-[55px]
      "
    >

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div
        className="
          w-full
          max-w-[1000px]
          mx-auto
        "
      >

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mb-6">

          {/* LABEL */}

          <span
            className="
              block
              mb-1.5
              text-center
              text-[10px]
              leading-[14px]
              font-bold
              tracking-[1px]
              text-[#159a9c]
            "
          >
            OPEN POSITIONS
          </span>


          {/* TITLE ROW */}

          <div
            className="
              relative
              flex
              items-center
              justify-center
            "
          >

            <h2
              className="
                m-0
                text-center
                text-[25px]
                sm:text-[29px]
                leading-9
                font-extrabold
                text-[#111827]
              "
            >
              Current Open Positions
            </h2>


            {/* VIEW ALL */}

            <button
              type="button"
              onClick={viewAllOpenings}
              className="
                absolute
                right-0
                top-1/2
                -translate-y-1/2
                border-0
                bg-transparent
                p-1
                text-[11px]
                sm:text-[13px]
                font-bold
                text-[#159a9c]
                cursor-pointer
                transition-all
                duration-300
                hover:text-[#0f766e]
              "
            >
              View All Openings →
            </button>

          </div>

        </div>


        {/* =================================================
            JOB CARDS GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
            lg:gap-x-5
            lg:gap-y-[18px]
          "
        >

          {jobs.map((job) => (

            <div
              key={job.id}
              className="
                min-w-0
                min-h-[166px]
                bg-white
                border
                border-[#e2e8f0]
                rounded-[11px]
                px-[18px]
                pt-[13px]
                pb-[11px]
                flex
                flex-col
                shadow-[0_5px_12px_rgba(0,0,0,0.20)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#159a9c]
                hover:shadow-[0_10px_22px_rgba(21,154,156,0.22)]
              "
            >

              {/* =================================================
                  JOB TOP
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-[10px]
                  mb-[7px]
                "
              >

                {/* ICON */}

                <div
                  className="
                    w-[38px]
                    h-[38px]
                    min-w-[38px]
                    rounded-full
                    bg-[#159a9c]
                    text-[#101820]
                    flex
                    items-center
                    justify-center
                    text-[20px]
                  "
                >
                  {job.icon}
                </div>


                {/* TITLE */}

                <h3
                  className="
                    m-0
                    text-[16px]
                    leading-5
                    font-extrabold
                    text-[#171b2b]
                  "
                >
                  {job.title}
                </h3>

              </div>


              {/* =================================================
                  JOB DETAILS
              ================================================= */}

              <div
                className="
                  flex
                  flex-col
                  gap-[2px]
                  ml-[48px]
                  mb-2
                "
              >

                {/* EXPERIENCE */}

                <div
                  className="
                    min-w-0
                    grid
                    grid-cols-[78px_1fr]
                    gap-1
                    items-start
                  "
                >
                  <span
                    className="
                      text-[11px]
                      leading-[17px]
                      font-semibold
                      text-[#707686]
                    "
                  >
                    Experience:
                  </span>

                  <strong
                    className="
                      min-w-0
                      overflow-hidden
                      text-ellipsis
                      whitespace-nowrap
                      text-[11px]
                      leading-[17px]
                      font-semibold
                      text-[#707686]
                    "
                  >
                    {job.experience}
                  </strong>
                </div>


                {/* LOCATION */}

                <div
                  className="
                    min-w-0
                    grid
                    grid-cols-[78px_1fr]
                    gap-1
                    items-start
                  "
                >
                  <span
                    className="
                      text-[11px]
                      leading-[17px]
                      font-semibold
                      text-[#707686]
                    "
                  >
                    Location:
                  </span>

                  <strong
                    className="
                      min-w-0
                      overflow-hidden
                      text-ellipsis
                      whitespace-nowrap
                      text-[11px]
                      leading-[17px]
                      font-semibold
                      text-[#707686]
                    "
                  >
                    {job.location}
                  </strong>
                </div>


                {/* EMPLOYMENT */}

                <div
                  className="
                    min-w-0
                    grid
                    grid-cols-[78px_1fr]
                    gap-1
                    items-start
                  "
                >
                  <span
                    className="
                      text-[11px]
                      leading-[17px]
                      font-semibold
                      text-[#707686]
                    "
                  >
                    Employment:
                  </span>

                  <strong
                    className="
                      min-w-0
                      overflow-hidden
                      text-ellipsis
                      whitespace-nowrap
                      text-[11px]
                      leading-[17px]
                      font-semibold
                      text-[#707686]
                    "
                  >
                    {job.employment}
                  </strong>
                </div>


                {/* SKILLS */}

                <div
                  className="
                    min-w-0
                    grid
                    grid-cols-[78px_1fr]
                    gap-1
                    items-start
                  "
                >
                  <span
                    className="
                      text-[11px]
                      leading-[17px]
                      font-semibold
                      text-[#707686]
                    "
                  >
                    Skills:
                  </span>

                  <strong
                    className="
                      min-w-0
                      overflow-hidden
                      text-ellipsis
                      whitespace-nowrap
                      text-[11px]
                      leading-[17px]
                      font-semibold
                      text-[#707686]
                    "
                  >
                    {job.skills}
                  </strong>
                </div>

              </div>


              {/* =================================================
                  VIEW DETAILS BUTTON
              ================================================= */}

              <button
                type="button"
                onClick={() => onJobDetails?.(job.id)}
                className="
                  self-start
                  ml-[48px]
                  mt-auto
                  border-0
                  bg-[#159a9c]
                  text-white
                  px-[10px]
                  py-[6px]
                  rounded-[5px]
                  text-[12px]
                  leading-4
                  font-bold
                  cursor-pointer
                  transition-all
                  duration-300
                  hover:bg-[#0f766e]
                  hover:-translate-y-0.5
                "
              >
                View Details →
              </button>

            </div>

          ))}

        </div>

      </div>


      {/* =================================================
          MOBILE RESPONSIVE OVERRIDE
      ================================================= */}

      <style>{`
        @media (max-width: 600px) {

          #open-positions {
            padding-left: 14px;
            padding-right: 14px;
          }

        }

        @media (max-width: 380px) {

          #open-positions {
            padding-left: 10px;
            padding-right: 10px;
          }

        }
      `}</style>

    </section>
  );
}

export default OpenPositions;