import { ArrowRight } from "lucide-react";

export default function WhoWeAre() {
  return (
    <section className="mx-auto max-w-[1024px] px-[20px] pt-[13px]">

      <div className="grid grid-cols-[1.6fr_0.9fr] gap-[25px]">

        {/* LEFT */}
        <div>

          <h2 className="text-[25px] font-normal leading-none text-[#36596b]">
            Who we are
          </h2>

          <h3 className="mt-[5px] text-[23px] font-extrabold leading-none text-[#29445e]">
            Building Solutions. Building Careers.
          </h3>

          <div className="mt-[9px] text-[16px] font-medium leading-[1.47] text-black">

            <p>
              steps infotech is an innovative It company delivering smart,
              scalable and reliable solutions to business worldwide. we also
              provide career opportunities to skilled and passionate
              individuals across various technology domains
            </p>

            <p className="mt-[0px]">
              our clients-centric approach,transparent communication and
              commitment to excellence to have helped us build long-term
              relationship and deliver measurable results.
            </p>

          </div>

          <button className="mt-[12px] flex items-center gap-[10px] rounded-[12px] bg-[#195762] px-[17px] py-[8px] text-[16px] font-bold text-white">

            lets know more about us

            <ArrowRight
              size={22}
              strokeWidth={3}
            />

          </button>

        </div>

        {/* RIGHT */}
        <div className="pt-[0px]">

          <img
            src="/images/about-building.png"
            alt="Steps Infotech building"
            className="h-[252px] w-full rounded-[27px] object-cover shadow-[0_7px_3px_rgba(0,0,0,0.3)]"
          />

        </div>

      </div>

    </section>
  );
}