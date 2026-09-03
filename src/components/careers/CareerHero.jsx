import First from "../../../../assets/Images/First.png";
import { useNavigate } from "react-router-dom";

function CareerHero() {
  const navigate = useNavigate();

  // ================= APPLY NOW =================
  const handleApplyNow = () => {
    navigate("/job-application");
  };

  // ================= VIEW OPENING =================
  const handleViewOpening = () => {
    const openPositions = document.getElementById("open-positions");

    if (openPositions) {
      openPositions.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className="
        relative
        w-full
        h-[372px]
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat

        max-lg:h-[430px]

        max-md:h-[520px]
        max-md:bg-[position:65%_center]

        max-sm:h-[500px]
        max-sm:bg-[position:68%_center]
      "
      style={{
        backgroundImage: `url(${First})`,
      }}
    >
      <div
        className="
          w-full
          h-full
          flex
          items-center

          bg-[linear-gradient(90deg,rgba(4,9,14,0.98)_0%,rgba(4,9,14,0.94)_25%,rgba(4,9,14,0.76)_43%,rgba(4,9,14,0.25)_70%,rgba(4,9,14,0.05)_100%)]

          max-md:bg-[linear-gradient(90deg,rgba(4,9,14,0.98)_0%,rgba(4,9,14,0.91)_55%,rgba(4,9,14,0.60)_100%)]
        "
      >
        <div
          className="
            w-full
            max-w-[1200px]
            mx-auto
            px-[30px]

            max-lg:px-[40px]
            max-md:px-[24px]
            max-sm:px-[20px]

            min-[1400px]:max-w-[1320px]
          "
        >
          <div
            className="
              w-[520px]
              mt-[-2px]

              max-lg:w-[500px]
              max-md:w-full
            "
          >
            <div
              className="
                text-[#0fa6a0]
                text-[13px]
                font-bold
                tracking-[1px]
                mb-[14px]

                max-md:text-[12px]
                max-md:mb-[12px]
              "
            >
              JOIN OUR TEAM
            </div>

            <h1
              className="
                m-0
                mb-[15px]
                text-white
                text-[48px]
                font-extrabold
                leading-[1.15]
                tracking-[-1px]

                min-[1400px]:text-[52px]
                max-lg:text-[42px]

                max-md:text-[38px]
                max-md:leading-[1.18]
                max-md:tracking-[-0.5px]

                max-sm:text-[32px]
              "
            >
              Build Your Future
              <br />
              With{" "}
              <span className="text-[#0fa6a0]">
                Steps Infotech
              </span>
            </h1>

            <p
              className="
                m-0
                mb-[27px]
                text-white
                text-[14px]
                font-normal
                leading-[1.7]

                max-lg:text-[13px]
                max-md:text-[13px]
                max-md:leading-[1.7]
                max-sm:text-[12px]
              "
            >
              Join a team of passionate innovators where your ideas
              <br className="max-md:hidden" />
              matter. Work on real-world project, grow your skills,
              <br className="max-md:hidden" />
              and build a rewarding career in technology.
            </p>

            <div
              className="
                flex
                items-center
                gap-[14px]

                max-sm:gap-[10px]
              "
            >
              <button
                type="button"
                onClick={handleApplyNow}
                className="
                  h-[40px]
                  px-[19px]
                  border-none
                  rounded-[6px]
                  bg-[#0fa6a0]
                  text-white
                  text-[12px]
                  font-bold
                  cursor-pointer
                  transition-all
                  duration-300
                  ease-in-out

                  hover:bg-[#087f7a]

                  max-sm:h-[38px]
                  max-sm:px-[15px]
                  max-sm:text-[11px]
                "
              >
                Apply Now →
              </button>

              <button
                type="button"
                onClick={handleViewOpening}
                className="
                  h-[40px]
                  px-[19px]
                  border-none
                  rounded-[6px]
                  bg-[#0fa6a0]
                  text-white
                  text-[12px]
                  font-bold
                  cursor-pointer
                  transition-all
                  duration-300
                  ease-in-out

                  hover:bg-[#087f7a]

                  max-sm:h-[38px]
                  max-sm:px-[15px]
                  max-sm:text-[11px]
                "
              >
                View Opening
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareerHero;