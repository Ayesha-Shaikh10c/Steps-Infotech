import {
  BriefcaseBusiness,
  Users,
  Building2,
  UserRound,
  ChartNoAxesCombined,
  BadgeCheck,
  Rocket,
  ArrowRight,
  Quote,
} from "lucide-react";
import Button from "../button/button";

const InternshipSection = () => {
  const stats = [
    { icon: BriefcaseBusiness, number: "500+", title: "Internship", subtitle: "opportunities" },
    { icon: Users, number: "10K+", title: "Happy", subtitle: "Interns" },
    { icon: Building2, number: "100+", title: "Partner", subtitle: "Companies" },
    { icon: UserRound, number: "90%", title: "Intern", subtitle: "Satisfaction" },
  ];

  const benefits = [
    { icon: ChartNoAxesCombined, title: "Real-world", subtitle: "Projects" },
    { icon: UserRound, title: "Mentorship", subtitle: "from Experts" },
    { icon: BadgeCheck, title: "Certificate of", subtitle: "Completion" },
    { icon: Rocket, title: "Career Growth", subtitle: "Support" },
  ];

  // These represent OTHER companies' actual brand colors (Google blue,
  // Microsoft/AWS orange, Oracle red) — a deliberate exception, same
  // reasoning as the real tech-stack logo colors elsewhere in the site.
  const trustedBy = [
    { symbol: "G", name: "Google", className: "text-blue-500 text-2xl" },
    { symbol: "⊞", name: "Microsoft", className: "text-orange-400 text-2xl" },
    { symbol: "aws", name: "AWS", className: "text-orange-400 text-lg" },
    { symbol: "▤", name: "Oracle", className: "text-red-400 text-2xl" },
    { symbol: "in", name: "LinkedIn", className: "text-white text-xl" },
  ];

  return (
    <section className="min-h-screen w-full overflow-hidden bg-brand-navy px-5 py-10 text-white sm:px-8 md:px-10 lg:px-12 xl:px-14 lg:py-14 font-body">
      <div className="mx-auto max-w-[1450px]">
        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">
          {/* ================= LEFT SIDE ================= */}
          <div className="flex flex-col">
            <h1 className="text-[48px] font-bold leading-[1.05] tracking-tight sm:text-[55px] md:text-[62px] lg:text-[66px] xl:text-[76px]">
              <span className="text-white">TOP IN-DEMAND INTERNSHIP IN</span>
              <br />
              <span className="text-brand-cyan">2026</span>
            </h1>

            <p className="mt-6 max-w-[650px] text-lg leading-[1.55] text-white sm:text-xl md:text-2xl">
              Join hands with Steps Infotech for the latest internship
              opportunities and tech career updates.
            </p>

            {/* ================= BUTTONS ================= */}
            <div className="mt-7 flex flex-wrap gap-6">
              <Button
                variant="accent"
                size="lg"
                icon={<ArrowRight size={21} />}
                className="!text-white hover:brightness-90"
              >
                <BriefcaseBusiness size={25} />
                Explore Internships
              </Button>

              {/* Recessed dark button — uses a translucent overlay on the
                  navy background instead of a separate hardcoded dark hex,
                  so it never needs manual updating if the navy token changes. */}
              <button className="flex items-center gap-2 rounded-2xl bg-white/10 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:px-8 sm:text-lg md:text-xl">
                <span>Learn More</span>
                <ArrowRight size={21} />
              </button>
            </div>

            {/* ================= STATS ================= */}
            <div className="mt-8 grid grid-cols-2 border-b border-white/15 pb-5 md:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.number}
                    className={`flex items-start gap-2 px-2 py-2 ${
                      index !== 0 ? "border-l border-white/20" : ""
                    }`}
                  >
                    <Icon size={29} strokeWidth={1.8} className="mt-1 shrink-0 text-brand-cyan" />
                    <div>
                      <h3 className="text-2xl font-bold leading-none text-white md:text-3xl">
                        {stat.number}
                      </h3>
                      <p className="mt-1 text-sm leading-tight text-white md:text-base">
                        {stat.title}
                        <br />
                        {stat.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================= WHY INTERN ================= */}
            <div className="mt-4">
              <h2 className="text-xl font-bold text-brand-cyan md:text-2xl">
                Why Intern with Steps Infotech?
              </h2>

              <div className="mt-4 grid grid-cols-2 lg:grid-cols-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={benefit.title}
                      className={`flex items-center gap-3 px-2 py-3 ${
                        index !== 0 ? "border-l border-white/15" : ""
                      }`}
                    >
                      <Icon size={31} strokeWidth={1.7} className="shrink-0 text-brand-cyan" />
                      <p className="text-sm leading-snug text-white md:text-base">
                        {benefit.title}
                        <br />
                        {benefit.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= TRUSTED BY ================= */}
            <div className="mt-7">
              <h3 className="mb-3 text-lg font-bold text-white">Trusted By</h3>

              <div className="grid grid-cols-2 items-center gap-5 rounded-2xl bg-white/5 px-5 py-5 sm:grid-cols-3 md:grid-cols-5">
                {trustedBy.map(({ symbol, name, className }) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className={`font-bold ${className}`}>{symbol}</span>
                    <span className="text-base font-semibold text-white sm:text-lg">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex flex-col">
            <div className="group w-full overflow-hidden rounded-[30px]">
              <img
                src="image1.png"
                alt="Steps Infotech Office"
                className="h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[470px] md:h-[550px] lg:h-[625px]"
              />
            </div>

            <div className="mt-7">
              <p className="text-lg leading-[1.55] text-white sm:text-xl lg:text-[22px] xl:text-[23px]">
                At Steps Infotech, we bridge the gap between talent and
                opportunity. Our internships are designed to help you learn,
                build, and grow with real-world exposure and industry
                mentorship.
              </p>

              <div className="mt-7 flex items-center gap-4">
                <Quote size={38} fill="currentColor" strokeWidth={0} className="shrink-0 text-brand-cyan" />
                <p className="text-xl font-medium italic text-brand-cyan sm:text-2xl">
                  Learn today. Lead tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipSection;