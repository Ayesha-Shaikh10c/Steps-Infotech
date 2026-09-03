import {
  FaDollarSign,
  FaChartLine,
  FaGraduationCap,
  FaCogs,
} from "react-icons/fa";

const benefits = [
  {
    id: 1,
    icon: <FaDollarSign />,
    title: "Competitive Salary",
    description:
      "We offer industry-standard compensation and performance-based incentives.",
  },
  {
    id: 2,
    icon: <FaChartLine />,
    title: "Career Growth",
    description:
      "Clear career paths and growth opportunities to achieve your goals.",
  },
  {
    id: 3,
    icon: <FaGraduationCap />,
    title: "Learning & Training",
    description:
      "Continuous learning with workshops, certifications and skill development programs.",
  },
  {
    id: 4,
    icon: <FaCogs />,
    title: "Flexible Work",
    description:
      "Flexible working hours and remote work options for a better work-life balance.",
  },
];

function WhyJoinUs() {
  return (
    <section
      className="
        w-full
        bg-white
        px-5
        pt-6
        pb-10
        font-[Poppins,sans-serif]
        max-[600px]:px-[15px]
        max-[600px]:pt-[25px]
        max-[600px]:pb-[35px]
        max-[380px]:px-[10px]
      "
      id="why-join-us"
    >
      {/* ================= CONTAINER ================= */}

      <div className="w-full max-w-[1000px] mx-auto">

        {/* ================= HEADING ================= */}

        <div
          className="
            text-center
            mb-[38px]
            max-[600px]:mb-[28px]
          "
        >
          <span
            className="
              block
              mb-2
              text-[#159a9c]
              text-[11px]
              font-bold
              tracking-[1px]
              max-[600px]:text-[10px]
            "
          >
            WHY JOIN US
          </span>

          <h2
            className="
              m-0
              mb-[7px]
              text-[#171b2b]
              text-[30px]
              leading-[1.2]
              font-extrabold
              max-[900px]:text-[28px]
              max-[600px]:text-[24px]
              max-[380px]:text-[21px]
            "
          >
            Why Choose Steps Infotech?
          </h2>

          <p
            className="
              m-0
              text-[#707686]
              text-[13px]
              leading-5
              font-semibold
              max-[600px]:text-[12px]
            "
          >
            We believe people are our greatest asset.
          </p>
        </div>

        {/* ================= CARDS ================= */}

        <div
          className="
            w-full
            grid
            grid-cols-4
            gap-[14px]

            max-[900px]:grid-cols-2
            max-[900px]:gap-4

            max-[600px]:grid-cols-2
            max-[600px]:gap-3

            max-[380px]:gap-[9px]
          "
        >
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="
                min-h-[158px]
                bg-white
                border
                border-[#e5e7eb]
                rounded-[10px]
                px-3
                pt-[18px]
                pb-[14px]

                text-center

                flex
                flex-col
                items-center

                shadow-[0_5px_12px_rgba(0,0,0,0.16)]

                transition-all
                duration-300
                ease-in-out

                hover:-translate-y-[5px]
                hover:border-[#159a9c]
                hover:shadow-[0_10px_22px_rgba(21,154,156,0.22)]

                max-[900px]:min-h-[165px]

                max-[600px]:min-h-[165px]
                max-[600px]:px-[10px]
                max-[600px]:pt-4
                max-[600px]:pb-[13px]
                max-[600px]:rounded-[9px]

                max-[380px]:min-h-[160px]
                max-[380px]:px-[7px]
              "
            >
              {/* ================= ICON ================= */}

              <div
                className="
                  w-[45px]
                  h-[45px]
                  min-w-[45px]

                  rounded-full

                  bg-[#159a9c]
                  text-white

                  flex
                  items-center
                  justify-center

                  text-[22px]

                  mb-[10px]

                  shrink-0

                  max-[600px]:w-10
                  max-[600px]:h-10
                  max-[600px]:min-w-10
                  max-[600px]:text-[19px]
                  max-[600px]:mb-[9px]

                  max-[380px]:w-[38px]
                  max-[380px]:h-[38px]
                  max-[380px]:min-w-[38px]
                "
              >
                {benefit.icon}
              </div>

              {/* ================= TITLE ================= */}

              <h3
                className="
                  m-0
                  mb-[5px]

                  text-[#171b2b]

                  text-[16px]
                  leading-5

                  font-extrabold

                  max-[600px]:text-[13px]
                  max-[600px]:leading-[17px]

                  max-[380px]:text-[12px]
                "
              >
                {benefit.title}
              </h3>

              {/* ================= DESCRIPTION ================= */}

              <p
                className="
                  m-0
                  max-w-[210px]

                  text-[#707686]

                  text-[11px]
                  leading-4

                  font-semibold

                  max-[600px]:text-[10px]
                  max-[600px]:leading-[14px]

                  max-[380px]:text-[9px]
                  max-[380px]:leading-[13px]
                "
              >
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyJoinUs;