import {
  FaFileAlt,
  FaSearch,
  FaCode,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";

const hiringSteps = [
  {
    id: 1,
    icon: <FaFileAlt />,
    step: "Step 1",
    title: "Apply Online",
    description: (
      <>
        Submit your application
        <br />
        and resume.
      </>
    ),
  },
  {
    id: 2,
    icon: <FaSearch />,
    step: "Step 2",
    title: "Resume Screening",
    description: (
      <>
        Our team reviews your
        <br />
        application.
      </>
    ),
  },
  {
    id: 3,
    icon: <FaCode />,
    step: "Step 3",
    title: "Technical Interview",
    description: (
      <>
        Technical assessment
        <br />
        with our experts.
      </>
    ),
  },
  {
    id: 4,
    icon: <FaUsers />,
    step: "Step 4",
    title: "HR Interview",
    description: (
      <>
        Meet our HR team for
        <br />
        final discussions.
      </>
    ),
  },
  {
    id: 5,
    icon: <FaEnvelope />,
    step: "Step 5",
    title: "Offer Letter",
    description: (
      <>
        Congratulations, you are
        <br />
        now a part of our team.
      </>
    ),
  },
];

function HiringProcess() {
  return (
    <section className="w-full bg-white pt-[30px] pb-[45px] max-[700px]:pt-[40px] max-[700px]:pb-[50px] max-[400px]:pt-[35px]">
      
      {/* ================= CONTAINER ================= */}

      <div className="mx-auto w-[92%] max-w-[1050px] max-[900px]:w-[94%] max-[700px]:w-[90%]">

        {/* ================= HEADING ================= */}

        <div className="mb-[32px] text-center max-[900px]:mb-[28px] max-[700px]:mb-[35px]">

          <span className="mb-[6px] block font-['Poppins'] text-[11px] font-extrabold leading-[16px] tracking-[0.5px] text-[#119c99] max-[700px]:text-[10px]">
            OUR HIRING PROCESS
          </span>

          <h2 className="m-0 font-['Poppins'] text-[30px] font-extrabold leading-[38px] text-[#111827] max-[900px]:text-[28px] max-[700px]:text-[25px] max-[700px]:leading-[34px] max-[400px]:text-[23px]">
            Our Recruitment Process
          </h2>

        </div>


        {/* ================= STEPS WRAPPER ================= */}

        <div className="relative grid w-full grid-cols-5 items-start max-[700px]:flex max-[700px]:flex-col max-[700px]:gap-[25px]">

          {/* ================= DOTTED CONNECTING LINE ================= */}

          <div
            className="
              absolute
              left-[5%]
              right-[5%]
              top-[29px]
              z-[1]
              h-[2px]
              bg-[repeating-linear-gradient(to_right,#119c99_0px,#119c99_4px,transparent_4px,transparent_8px)]
              max-[900px]:top-[27px]

              max-[700px]:top-0
              max-[700px]:bottom-0
              max-[700px]:left-[28px]
              max-[700px]:right-auto
              max-[700px]:h-auto
              max-[700px]:w-[2px]
              max-[700px]:bg-[repeating-linear-gradient(to_bottom,#119c99_0px,#119c99_4px,transparent_4px,transparent_8px)]

              max-[400px]:left-[25px]
            "
          />


          {/* ================= ALL STEPS ================= */}

          {hiringSteps.map((item) => (
            <div
              key={item.id}
              className="
                relative
                z-[2]
                flex
                min-w-0
                flex-col
                items-center
                text-center

                max-[700px]:grid
                max-[700px]:w-full
                max-[700px]:grid-cols-[58px_1fr]
                max-[700px]:grid-rows-[auto_auto_auto]
                max-[700px]:items-center
                max-[700px]:gap-x-[18px]
                max-[700px]:text-left

                max-[400px]:grid-cols-[52px_1fr]
                max-[400px]:gap-x-[15px]
              "
            >

              {/* ================= ICON ================= */}

              <div
                className="
                  flex
                  h-[58px]
                  w-[58px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border-[3px]
                  border-white
                  bg-[#119c99]
                  text-[27px]
                  text-[#071717]
                  transition-all
                  duration-300

                  max-[900px]:h-[54px]
                  max-[900px]:w-[54px]
                  max-[900px]:text-[24px]

                  max-[700px]:col-start-1
                  max-[700px]:row-span-3
                  max-[700px]:row-start-1
                  max-[700px]:m-0
                  max-[700px]:h-[58px]
                  max-[700px]:w-[58px]
                  max-[700px]:text-[24px]

                  max-[400px]:h-[52px]
                  max-[400px]:w-[52px]
                  max-[400px]:text-[21px]

                  hover:-translate-y-[3px]
                  hover:shadow-[0_8px_18px_rgba(17,156,153,0.25)]
                "
              >
                {item.icon}
              </div>


              {/* ================= STEP NUMBER ================= */}

              <div
                className="
                  mb-[7px]
                  font-['Poppins']
                  text-[12px]
                  font-extrabold
                  leading-[16px]
                  text-[#119c99]

                  max-[700px]:col-start-2
                  max-[700px]:row-start-1
                  max-[700px]:mb-[3px]
                  max-[700px]:text-[11px]
                "
              >
                {item.step}
              </div>


              {/* ================= TITLE ================= */}

              <h3
                className="
                  m-0
                  mb-[5px]
                  font-['Poppins']
                  text-[14px]
                  font-extrabold
                  leading-[19px]
                  text-[#111827]

                  max-[900px]:text-[13px]

                  max-[700px]:col-start-2
                  max-[700px]:row-start-2
                  max-[700px]:mb-[3px]
                  max-[700px]:text-[15px]
                  max-[700px]:leading-[20px]
                "
              >
                {item.title}
              </h3>


              {/* ================= DESCRIPTION ================= */}

              <p
                className="
                  m-0
                  font-['Poppins']
                  text-[10.5px]
                  font-semibold
                  leading-[16px]
                  text-[#475569]

                  max-[900px]:text-[9.5px]
                  max-[900px]:leading-[15px]

                  max-[700px]:col-start-2
                  max-[700px]:row-start-3
                  max-[700px]:text-[11px]
                  max-[700px]:leading-[17px]
                "
              >
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HiringProcess;