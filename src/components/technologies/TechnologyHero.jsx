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
    <section className="w-full overflow-hidden bg-[#155b5d] py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid min-h-[450px] w-[90%] max-w-[1280px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-15">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">

          <p className="mb-4 text-sm font-semibold tracking-[2px] text-[#83a9aa]">
            OUR TECHNOLOGIES
          </p>

          <h1 className="font-['Barlow_Condensed'] text-6xl font-700 leading-[0.88] tracking-[-1px] text-white sm:text-7xl md:text-8xl lg:text-[90px]">
            Technologies
            <br />
            We Use To Build
            <br />
            The Future
          </h1>

          <p className="mx-auto mt-7 max-w-[590px] text-sm font-normal leading-7 text-white/70 sm:text-base lg:mx-0">
            We leverage modern technologies and industry-leading tools to build
            secure, scalable, high-performing and future-ready digital
            solutions.
          </p>

        </div>

        {/* RIGHT VISUAL */}
        <div className="relative mx-auto h-[300px] w-full max-w-[550px] sm:h-[380px] lg:h-[400px]">

          {/* TECHNOLOGY LOGOS */}

          <SiJavascript className="absolute top-5 left-[5%] z-10 rotate-[-18deg] text-4xl text-[#f7df1e] drop-shadow-lg sm:text-5xl" />

          <SiReact className="absolute top-0 left-[48%] z-10 text-4xl text-[#23b9d5] drop-shadow-lg sm:-top-6 sm:text-6xl" />

          <SiPython className="absolute top-2 right-[5%] z-10 text-4xl text-[#ffd343] drop-shadow-lg sm:text-5xl" />

          <SiNodedotjs className="absolute top-[75px] right-0 z-10 text-3xl text-[#8bc34a] drop-shadow-lg sm:text-4xl" />

          <SiMongodb className="absolute bottom-[105px] left-[7%] z-10 text-3xl text-[#65a845] drop-shadow-lg sm:text-4xl" />

          <SiPostgresql className="absolute right-0 bottom-[75px] z-10 text-4xl text-[#b3d0d8] drop-shadow-lg sm:text-5xl" />

          {/* LAPTOP */}
          <div className="absolute bottom-5 left-1/2 w-[250px] -translate-x-1/2 sm:bottom-6 sm:w-[340px]">

            {/* Laptop Screen */}
            <div className="relative h-[165px] overflow-hidden rounded-t-2xl border-[5px] border-[#c6c6c6] bg-[linear-gradient(135deg,#b8dce7_0%,#b8dce7_50%,#59bfd9_50%,#59bfd9_100%)] sm:h-[220px]">

              {/* User Avatar Head */}
              <div className="absolute top-5 left-1/2 h-[52px] w-[52px] -translate-x-1/2 rounded-full border-2 border-[#6e7476] bg-[#d3d3d3] sm:top-7 sm:h-[68px] sm:w-[68px]" />

              {/* User Avatar Body */}
              <div className="absolute bottom-[22px] left-1/2 h-[55px] w-[110px] -translate-x-1/2 rounded-t-[75px] border-2 border-[#6e7476] bg-[#d3d3d3] sm:bottom-[30px] sm:h-[70px] sm:w-[140px]" />

            </div>

            {/* Laptop Base */}
            <div className="relative left-1/2 h-[35px] w-[285px] -translate-x-1/2 rounded-b-[35px] bg-[#e5e5e5] shadow-[0_8px_12px_rgba(0,0,0,0.2)] sm:h-[46px] sm:w-[390px]" />

          </div>

        </div>
      </div>
    </section>
  );
}

export default TechnologyHero;