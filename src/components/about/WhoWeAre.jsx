import { ArrowRight } from "lucide-react";
import aboutBuilding from "../../assets/about-building.png";

function WhoWeAre() {
  return (
    <section className="w-full bg-white px-4 py-10 md:px-8 md:py-12">
      <div className="mx-auto grid max-w-[1024px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">

        {/* LEFT CONTENT */}
        <div className="w-full">
          <h2 className="text-[24px] font-normal leading-tight text-[#36596b] md:text-[27px]">
            Who we are
          </h2>

          <h3 className="mt-2 text-[22px] font-extrabold leading-tight text-[#29445e] md:text-[27px]">
            Building Solutions. Building Careers.
          </h3>

          <p className="mt-4 text-[14px] font-medium leading-[1.6] text-black md:text-[15px]">
            steps infotech is an innovative IT company delivering smart,
            scalable and reliable solutions to business worldwide. we also
            provide career opportunities to skilled and passionate
            individuals across various technology domains.
          </p>

          <p className="mt-3 text-[14px] font-medium leading-[1.6] text-black md:text-[15px]">
            our clients-centric approach, transparent communication and
            commitment to excellence to have helped us build long-term
            relationship and deliver measurable results.
          </p>

          <button
            type="button"
            className="mt-5 flex items-center gap-2 rounded-xl bg-[#195762] px-5 py-2.5 text-sm font-bold text-white transition duration-300 hover:bg-[#124852]"
          >
            lets know more about us

            <ArrowRight
              size={20}
              strokeWidth={3}
            />
          </button>
        </div>

        {/* RIGHT BUILDING IMAGE */}
        <div className="flex w-full justify-center md:justify-end">
          <img
            src={aboutBuilding}
            alt="Steps Infotech building"
            className="h-[260px] w-full max-w-[430px] rounded-[25px] object-cover shadow-[0_6px_10px_rgba(0,0,0,0.25)] md:h-[310px]"
          />
        </div>

      </div>
    </section>
  );
}

export default WhoWeAre;