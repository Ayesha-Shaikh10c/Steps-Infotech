import {
  ArrowRight,
  Building2,
  GraduationCap,
  HeartHandshake,
  Users,
} from "lucide-react";

function Hero() {
  return (
    <section className="bg-[#00484d]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:px-10 lg:py-12">
        
        {/* LEFT */}
        <div className="max-w-[550px]">
          <p className="text-[18px] font-bold text-white sm:text-[28px] lg:text-[32px]">
            Top In-demand
          </p>

          <h1 className="mt-1 text-[32px] font-bold leading-[1.05] sm:text-[42px] lg:text-[48px]">
            Internship In
            <br />
            <span className="text-[#0be0e7]">2026</span>
          </h1>

          <p className="mt-2 max-w-[440px] text-[12px] leading-[1.45] text-white sm:text-[14px]">
            Join hands with Steps Infotech for the latest internship
            opportunities and tech career updates.
          </p>

          <div className="mt-4 flex gap-3">
            <a
              href="/internships"
              className="flex items-center gap-1.5 rounded-md bg-[#09cbd2] px-3 py-2 text-[9px] font-semibold text-white sm:px-4 sm:py-2.5"
            >
              Explore Internships
              <ArrowRight size={11} />
            </a>

            <a
              href="/about"
              className="flex items-center gap-1.5 rounded-md bg-[#002f34] px-4 py-2.5 text-[9px] font-semibold text-white"
            >
              Learn More
              <ArrowRight size={11} />
            </a>
          </div>

          {/* Hero statistics */}
          <div className="mt-5 grid grid-cols-4 border-t border-white/20 pt-4">
            <HeroStat
              icon={GraduationCap}
              value="500+"
              text="Internship opportunities"
            />

            <HeroStat
              icon={Users}
              value="10K+"
              text="Happy Interns"
            />

            <HeroStat
              icon={Building2}
              value="100+"
              text="Partner Companies"
            />

            <HeroStat
              icon={HeartHandshake}
              value="90%"
              text="Intern Satisfaction"
            />
          </div>

          {/* Trusted by */}
          <div className="mt-4">
            <p className="mb-1.5 text-[7px] text-white/60">
              Trusted By
            </p>

            <div className="flex w-fit items-center gap-4 rounded-lg bg-[#003a3f] px-4 py-2">
              <span className="text-[9px] font-semibold">Google</span>
              <span className="text-[9px] font-semibold">Microsoft</span>
              <span className="text-[9px] font-semibold">AWS</span>
              <span className="text-[9px] font-semibold">Oracle</span>
              <span className="text-[9px] font-semibold">LinkedIn</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src="/assets/hero-office.png"
            alt="Steps Infotech office"
            className="h-[290px] w-full rounded-[18px] object-cover sm:h-[350px] lg:h-[370px]"
          />
        </div>
      </div>
    </section>
  );
}

function HeroStat({ icon: Icon, value, text }) {
  return (
    <div className="flex min-w-0 items-start gap-1.5 border-r border-white/20 px-2 first:pl-0 last:border-r-0">
      <Icon
        size={13}
        className="mt-0.5 shrink-0 text-[#08d5dc]"
      />

      <div>
        <p className="text-[11px] font-bold">{value}</p>
        <p className="text-[7px] leading-[1.15] text-white/75">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Hero;