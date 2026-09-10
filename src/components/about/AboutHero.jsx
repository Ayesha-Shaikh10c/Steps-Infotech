import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="px-0">

      <div className="relative mx-auto h-[243px] max-w-[1024px] overflow-hidden rounded-b-[27px] shadow-[0_6px_3px_rgba(0,0,0,0.3)]">

        {/* Background */}
        <img
          src="/images/about-hero.png"
          alt="Steps Infotech"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#006875]/75" />

        {/* Content */}
        <div className="relative z-10 px-[35px] pt-[10px] text-white">

          <h1 className="text-[23px] font-normal leading-[1.45]">
            ABOUT
            <br />
            STEPS INFOTECH
          </h1>

          <p className="mt-[26px] max-w-[385px] text-[15px] font-normal leading-[1.75]">
            we are a technology - driven company that
            <br />
            builds innovatives digital solutions and connects
            <br />
            talent with opportunities across multiple domains.
          </p>

          <button className="mt-[11px] flex items-center gap-[10px] rounded-[13px] bg-[#11aeca] px-[17px] py-[7px] text-[16px] font-bold shadow-sm">

            join our team

            <ArrowRight
              size={23}
              strokeWidth={3}
            />

          </button>

        </div>

      </div>

    </section>
  );
}