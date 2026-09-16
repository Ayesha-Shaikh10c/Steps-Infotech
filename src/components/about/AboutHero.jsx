import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutHero() {
  return (
    <section className="px-0">

      {/* ================= BANNER ================= */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1024px]
          overflow-hidden
          rounded-[27px]
          shadow-[0_6px_12px_rgba(0,0,0,0.25)]
        "
      >

        {/* ================= BACKGROUND IMAGE ================= */}

        <img
          src="/src/assets/about-banner.png"
          alt="Steps Infotech"
          className="block h-auto w-full"
        />


        {/* ================= TEXT ================= */}

        <div
          className="
            absolute
            left-0
            top-0
            z-10
            flex
            h-full
            w-[52%]
            flex-col
            justify-center
            px-[35px]
          "
        >

          {/* ================= ABOUT ================= */}

          <p
            className="
              text-[18px]
              font-extrabold
              uppercase
              tracking-[5px]
              text-[#07858a]
              drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]
              md:text-[20px]
            "
          >
            ABOUT
          </p>


          {/* ================= TITLE ================= */}

          <h1
            className="
              mt-[2px]
              text-[34px]
              font-extrabold
              uppercase
              leading-[1.05]
              tracking-[-0.5px]
              md:text-[40px]
            "
          >
            <span
              className="
                text-[#123f55]
                drop-shadow-[0_2px_2px_rgba(255,255,255,0.95)]
              "
            >
              STEPS
            </span>

            {" "}

            <span
              className="
                text-[#087f84]
                drop-shadow-[0_2px_2px_rgba(255,255,255,0.95)]
              "
            >
              INFOTECH
            </span>
          </h1>


          {/* ================= DESCRIPTION ================= */}

          <p
            className="
              mt-[18px]
              max-w-[400px]
              text-[15px]
              font-bold
              leading-[1.65]
              text-[#173f55]
              drop-shadow-[0_1px_2px_rgba(255,255,255,1)]
              md:text-[16px]
            "
          >
            <span>We are a </span>

            <span className="text-[#075e63]">
              technology-driven
            </span>

            <span> company that </span>

            <span className="text-[#075e63]">
              builds innovative digital solutions
            </span>

            <span> and </span>

            <span className="text-[#075e63]">
              connects talent
            </span>

            <span> with opportunities across multiple domains.</span>
          </p>


          {/* ================= JOIN OUR TEAM ================= */}

          <Link
            to="/careers"
            className="
              mt-[18px]
              flex
              w-fit
              items-center
              gap-[10px]
              rounded-[13px]
              bg-[#159da0]
              px-[19px]
              py-[8px]
              text-[16px]
              font-bold
              text-white
              shadow-[0_4px_10px_rgba(21,157,160,0.25)]
              transition-all
              duration-300
              hover:bg-[#117f82]
              hover:shadow-[0_6px_15px_rgba(21,157,160,0.35)]
            "
          >
            Join our team

            <ArrowRight
              size={23}
              strokeWidth={3}
            />
          </Link>

        </div>

      </div>

    </section>
  );
}