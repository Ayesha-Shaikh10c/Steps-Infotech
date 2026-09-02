import Second from "../../../../assets/Images/Second.png";

import {
  FaClock,
  FaCertificate,
  FaProjectDiagram,
  FaUserTie,
  FaHeartbeat,
  FaBookOpen,
  FaUsers,
  FaCalendarCheck,
  FaBolt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaClock />,
    title: "Duration",
  },
  {
    icon: <FaCertificate />,
    title: "Certificate",
  },
  {
    icon: <FaProjectDiagram />,
    title: "Projects",
  },
  {
    icon: <FaUserTie />,
    title: "Mentorship",
  },
];

const benefits = [
  {
    icon: <FaClock />,
    title: "Flexible Hours",
    description: "Work balance",
  },
  {
    icon: <FaHeartbeat />,
    title: "Health Insurance",
    description: "Coverage for you",
  },
  {
    icon: <FaBookOpen />,
    title: "Learning Budget",
    description: "Courses & books",
  },
  {
    icon: <FaUsers />,
    title: "Team Events",
    description: "Fun & celebrations",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Paid Leaves",
    description: "Time to recharge",
  },
  {
    icon: <FaBolt />,
    title: "Performance Bonus",
    description: "Reward for excellence",
  },
];

function Internship() {
  const handleInternshipApply = () => {
    window.location.href = "/job-application?type=internship";
  };

  return (
    <section className="w-full bg-white py-[35px]">

      <div
        className="
          mx-auto
          grid
          w-[88%]
          max-w-[940px]
          grid-cols-1
          gap-5
          md:grid-cols-2
        "
      >

        {/* =====================================================
            INTERNSHIP CARD
        ===================================================== */}

        <div
          className="
            relative
            h-[225px]
            overflow-hidden
            rounded-[10px]
            shadow-[0_5px_14px_rgba(0,0,0,0.20)]

            max-md:h-[280px]
            max-[480px]:h-[320px]
          "
        >

          {/* BACKGROUND IMAGE */}

          <img
            src={Second}
            alt="Steps Infotech Internship"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
          />

          {/* DARK OVERLAY */}

          <div
            className="
              absolute
              inset-0

              bg-[linear-gradient(90deg,rgba(0,91,95,0.96)_0%,rgba(0,112,116,0.88)_40%,rgba(0,112,116,0.45)_72%,rgba(0,112,116,0.10)_100%)]

              max-[480px]:bg-[linear-gradient(90deg,rgba(0,91,95,0.97),rgba(0,112,116,0.80))]
            "
          />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              h-full
              w-full

              p-[22px]

              max-md:px-5
              max-[480px]:px-5
            "
          >

            {/* =================================================
                TAG
            ================================================= */}

            <span
              className="
                mb-[5px]
                block

                text-[13px]
                font-extrabold
                tracking-[0.5px]
                text-[#21b5b8]

                max-md:text-[12px]
              "
            >
              INTERNSHIP PROGRAM
            </span>


            {/* =================================================
                TITLE
            ================================================= */}

            <h2
              className="
                m-0
                mb-2

                max-w-[330px]

                text-[19px]
                font-extrabold
                leading-[23px]
                text-white

                max-md:text-[20px]
              "
            >
              Kickstart Your Career With Us
            </h2>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                m-0

                max-w-[350px]

                text-[11px]
                font-semibold
                leading-[16px]
                text-white

                max-md:max-w-[380px]
                max-md:text-[12px]
                max-md:leading-[17px]
              "
            >
              We offer internship opportunities for students to learn,
              grow and work on exciting real-world projects.
            </p>


            {/* =================================================
                FEATURES
                FIXED ABOVE BUTTON
            ================================================= */}

            <div
              className="
                absolute

                bottom-[53px]
                left-[22px]

                flex
                items-end
                gap-[18px]

                max-md:left-5
                max-md:gap-4

                max-[480px]:bottom-[58px]
                max-[480px]:left-5
                max-[480px]:gap-3
              "
            >

              {features.map((item, index) => (
                <div
                  key={index}
                  className="
                    flex
                    min-w-[42px]
                    flex-col
                    items-center
                    justify-end
                    text-center
                  "
                >

                  {/* ICON */}

                  <div
                    className="
                      mb-[3px]

                      flex
                      h-[25px]
                      w-[25px]
                      items-center
                      justify-center

                      text-[20px]
                      text-black
                    "
                  >
                    {item.icon}
                  </div>


                  {/* TITLE */}

                  <span
                    className="
                      whitespace-nowrap

                      text-[9px]
                      font-bold
                      text-white
                    "
                  >
                    {item.title}
                  </span>

                </div>
              ))}

            </div>


            {/* =================================================
                APPLY BUTTON
                FIXED AT VERY BOTTOM
            ================================================= */}

            <button
              type="button"
              onClick={handleInternshipApply}
              className="
                absolute

                bottom-[12px]
                left-[22px]

                h-[36px]

                cursor-pointer

                rounded-[6px]
                border-0

                bg-[#0f9fa3]

                px-[17px]

                text-[11px]
                font-bold
                text-white

                transition-all
                duration-300

                hover:-translate-y-[2px]
                hover:bg-[#087c80]

                active:translate-y-0

                max-md:left-5

                max-[480px]:bottom-[15px]
                max-[480px]:left-5
              "
            >
              Apply for Internship →
            </button>

          </div>
        </div>


        {/* =====================================================
            EMPLOYEE BENEFITS
        ===================================================== */}

        <div
          className="
            h-[225px]

            rounded-[10px]

            border
            border-[#e5e7eb]

            bg-white

            px-[14px]
            py-4

            shadow-[0_5px_14px_rgba(0,0,0,0.16)]

            max-md:h-auto
          "
        >

          {/* HEADING */}

          <div className="mb-[14px] text-center">

            <span
              className="
                text-[12px]
                font-extrabold
                tracking-[0.4px]
                text-[#0f9fa3]
              "
            >
              EMPLOYEE BENEFITS
            </span>

          </div>


          {/* BENEFITS GRID */}

          <div
            className="
              grid
              grid-cols-3
              gap-3

              max-[480px]:grid-cols-2
              max-[480px]:gap-[10px]
            "
          >

            {benefits.map((item, index) => (
              <div
                key={index}
                className="
                  flex
                  h-[69px]
                  flex-col
                  items-center
                  justify-center

                  rounded-[9px]

                  border
                  border-[#e5e7eb]

                  bg-white

                  text-center

                  shadow-[0_4px_9px_rgba(0,0,0,0.18)]

                  transition-all
                  duration-300

                  hover:-translate-y-[3px]
                  hover:border-[#0f9fa3]
                  hover:shadow-[0_6px_13px_rgba(15,159,163,0.20)]

                  max-md:h-[80px]

                  max-[480px]:h-[78px]
                "
              >

                {/* ICON */}

                <div
                  className="
                    mb-[2px]

                    flex
                    h-6
                    w-6
                    items-center
                    justify-center

                    text-[18px]
                    text-black
                  "
                >
                  {item.icon}
                </div>


                {/* TITLE */}

                <h3
                  className="
                    m-0

                    text-[10px]
                    font-extrabold
                    leading-[13px]
                    text-[#111827]
                  "
                >
                  {item.title}
                </h3>


                {/* DESCRIPTION */}

                <p
                  className="
                    m-0

                    text-[9px]
                    font-bold
                    leading-3
                    text-[#64748b]
                  "
                >
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default Internship;