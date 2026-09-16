import {
  SiJavascript,
  SiReact,
  SiPython,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";

function TechnologyHero() {
  return (
    <section className="page-hero w-full overflow-hidden bg-[#155b5d]">
      <div
        className="
          mx-auto
          flex
          h-full
          w-[90%]
          max-w-[1280px]
          flex-col
          items-center
          justify-center
          gap-5

          lg:flex-row
          lg:gap-8
        "
      >
        {/* LEFT SIDE */}
        <div className="w-full lg:w-[54%]">
          <div className="text-center lg:text-left">
            <p
              className="
                mb-2
                font-body
                text-xs
                font-semibold
                tracking-[2px]
                text-[#83a9aa]

                sm:text-sm
              "
            >
              OUR TECHNOLOGIES
            </p>

            <h1
              className="
                font-heading
                text-4xl
                font-bold
                leading-[0.98]
                tracking-[-1px]
                text-white

                sm:text-5xl
                md:text-6xl
                lg:text-[64px]
                xl:text-[72px]
              "
            >
              Technologies
              <br />
              We Use To Build
              <br />
              The Future
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-[590px]
                font-body
                text-sm
                leading-6
                text-white/70

                sm:mt-5
                sm:text-base
                sm:leading-7

                lg:mx-0
              "
            >
              We leverage modern technologies and industry-leading tools to
              build secure, scalable, high-performing and future-ready digital
              solutions.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative w-full max-w-[500px] lg:w-[46%]">
          <div
            className="
              relative
              mx-auto
              h-[245px]
              w-full

              sm:h-[285px]
              md:h-[305px]
            "
          >
            {/* JavaScript */}
            <SiJavascript
              className="
                absolute
                left-[5%]
                top-1
                z-10
                rotate-[-18deg]
                text-4xl
                text-[#f7df1e]
                drop-shadow-lg

                sm:text-5xl
              "
            />

            {/* React */}
            <SiReact
              className="
                absolute
                left-[48%]
                top-0
                z-10
                text-4xl
                text-[#23b9d5]
                drop-shadow-lg

                sm:text-5xl
                md:text-6xl
              "
            />

            {/* Python */}
            <SiPython
              className="
                absolute
                right-[5%]
                top-1
                z-10
                text-4xl
                text-[#ffd343]
                drop-shadow-lg

                sm:text-5xl
              "
            />

            {/* Node */}
            <SiNodedotjs
              className="
                absolute
                right-0
                top-[55px]
                z-10
                text-3xl
                text-[#8bc34a]
                drop-shadow-lg

                sm:text-4xl
              "
            />

            {/* MongoDB */}
            <SiMongodb
              className="
                absolute
                bottom-[62px]
                left-[7%]
                z-10
                text-3xl
                text-[#65a845]
                drop-shadow-lg

                sm:text-4xl
              "
            />

            {/* PostgreSQL */}
            <SiPostgresql
              className="
                absolute
                bottom-[40px]
                right-0
                z-10
                text-4xl
                text-[#b3d0d8]
                drop-shadow-lg

                sm:text-5xl
              "
            />

            {/* LAPTOP */}
            <div
              className="
                absolute
                bottom-0
                left-1/2
                w-[220px]
                -translate-x-1/2

                sm:w-[285px]
                md:w-[300px]
              "
            >
              {/* Screen */}
              <div
                className="
                  relative
                  h-[140px]
                  overflow-hidden
                  rounded-t-2xl
                  border-[5px]
                  border-[#c6c6c6]
                  bg-[linear-gradient(135deg,#b8dce7_0%,#b8dce7_50%,#59bfd9_50%,#59bfd9_100%)]

                  sm:h-[180px]
                  md:h-[185px]
                "
              >
                {/* Avatar head */}
                <div
                  className="
                    absolute
                    left-1/2
                    top-4
                    h-[45px]
                    w-[45px]
                    -translate-x-1/2
                    rounded-full
                    border-2
                    border-[#6e7476]
                    bg-[#d3d3d3]

                    sm:top-6
                    sm:h-[58px]
                    sm:w-[58px]
                  "
                />

                {/* Avatar body */}
                <div
                  className="
                    absolute
                    bottom-[16px]
                    left-1/2
                    h-[47px]
                    w-[94px]
                    -translate-x-1/2
                    rounded-t-[75px]
                    border-2
                    border-[#6e7476]
                    bg-[#d3d3d3]

                    sm:bottom-[23px]
                    sm:h-[62px]
                    sm:w-[124px]
                  "
                />
              </div>

              {/* Laptop base */}
              <div
                className="
                  relative
                  left-1/2
                  h-[28px]
                  w-[250px]
                  -translate-x-1/2
                  rounded-b-[35px]
                  bg-[#e5e5e5]
                  shadow-[0_8px_12px_rgba(0,0,0,0.2)]

                  sm:h-[38px]
                  sm:w-[330px]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechnologyHero;