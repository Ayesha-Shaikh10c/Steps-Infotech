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


/* =========================================================
   BRAND LOGO SVGS (inline, no external dependency needed)
========================================================= */

const GoogleLogo = ({ className = "h-full w-full" }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
      c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
      c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
      C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
      c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002
      l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

const MicrosoftLogo = ({ className = "h-full w-full" }) => (
  <svg className={className} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="10" height="10" fill="#f25022" />
    <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
    <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
    <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
  </svg>
);

const OracleLogo = ({ className = "h-full w-full" }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="#EA1B22" />
    <text
      x="24"
      y="30"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontWeight="800"
      fontSize="13"
      fill="#FFFFFF"
    >
      ORCL
    </text>
  </svg>
);

const LinkedInLogo = ({ className = "h-full w-full" }) => (
  <svg className={className} viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg">
    <rect width="448" height="448" rx="24" fill="#0A66C2" />
    <path
      fill="#fff"
      d="M135.4 181.6H93.4V354.6H135.4V181.6ZM114.5 93.4C100.4 93.4 90.4 103.1 90.4 116.1C90.4 128.8 100.1 138.8 114 138.8H114.3C128.7 138.8 138.4 128.8 138.4 116.1C138.1 103.1 128.7 93.4 114.5 93.4ZM313.4 181.6C289.3 181.6 274.8 194.5 267.6 204.6V181.6H225.6C226.1 195.6 225.6 354.6 225.6 354.6H267.6V257.1C267.6 251.6 267.9 246.1 269.5 242.1C273.9 231.1 284 219.7 300.9 219.7C323.1 219.7 335.4 234.3 335.4 256.7V354.6H377.4V251.8C377.4 213.2 356.9 181.6 313.4 181.6Z"
    />
  </svg>
);

const InternshipSection = () => {
  const stats = [
    {
      icon: BriefcaseBusiness,
      number: "500+",
      title: "Internship",
      subtitle: "opportunities",
    },
    {
      icon: Users,
      number: "10K+",
      title: "Happy",
      subtitle: "Interns",
    },
    {
      icon: Building2,
      number: "100+",
      title: "Partner",
      subtitle: "Companies",
    },
    {
      icon: UserRound,
      number: "90%",
      title: "Intern",
      subtitle: "Satisfaction",
    },
  ];

  const benefits = [
    {
      icon: ChartNoAxesCombined,
      title: "Real-world",
      subtitle: "Projects",
    },
    {
      icon: UserRound,
      title: "Mentorship",
      subtitle: "from Experts",
    },
    {
      icon: BadgeCheck,
      title: "Certificate of",
      subtitle: "Completion",
    },
    {
      icon: Rocket,
      title: "Career Growth",
      subtitle: "Support",
    },
  ];

  const trustedCompanies = [
    { name: "Google", Logo: GoogleLogo },
    { name: "Microsoft", Logo: MicrosoftLogo },
    { name: "Oracle", Logo: OracleLogo },
    { name: "LinkedIn", Logo: LinkedInLogo },
  ];

  return (
    <section className="page-hero w-full overflow-hidden bg-brand-navy px-5 text-white sm:px-8 md:px-10 lg:px-12 xl:px-14 font-body">
      <div className="mx-auto flex h-full max-w-[1500px] flex-col justify-center">
        {/* HERO CONTENT */}
        <div className="grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] !text-brand-cyan sm:text-base">
              STEPS INFOTECH
            </p>

            <h1 className="font-heading text-[38px] font-bold leading-[1.12] tracking-tight !text-white sm:text-[45px] md:text-[52px] lg:text-[56px] xl:text-[62px]">
              <span className="!text-white">
                TOP IN-DEMAND
                <br />
                INTERNSHIP IN
              </span>
              <br />
              <span className="!text-brand-cyan">2026</span>
            </h1>

            <p className="mt-4 max-w-[600px] text-sm leading-6 !text-white/80 sm:text-base sm:leading-7">
              Build real-world experience, learn from industry experts, and
              accelerate your career with practical internship opportunities.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button>
                Explore Internships
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* ================= STATS ================= */}

            <div className="mt-8 grid grid-cols-2 border-b border-[#155b64] pb-5 md:grid-cols-4">

              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.number}
                    className={`flex items-start gap-2 px-2 py-2 ${
                      index !== 0
                        ? "border-l border-[#83a3a7]"
                        : ""
                    }`}
                  >

                    <Icon
                      size={29}
                      strokeWidth={1.8}
                      className="mt-1 shrink-0 text-[#11dce6]"
                    />

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

              <h2 className="text-xl font-bold text-[#12dce8] md:text-2xl">
                Why Intern with Steps Infotech?
              </h2>

              <div className="mt-4 grid grid-cols-2 lg:grid-cols-4">

                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;

                  return (
                    <div
                      key={benefit.title}
                      className={`flex items-center gap-3 px-2 py-3 ${
                        index !== 0
                          ? "border-l border-[#326a71]"
                          : ""
                      }`}
                    >

                      <Icon
                        size={31}
                        strokeWidth={1.7}
                        className="shrink-0 text-[#10dfe8]"
                      />

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

              <h3 className="mb-3 text-lg font-bold text-white">
                Trusted By
              </h3>

              <div className="grid grid-cols-2 items-center gap-5 rounded-2xl bg-[#002d36] px-5 py-5 sm:grid-cols-4">

                {trustedCompanies.map(({ name, Logo }) => (
                  <div
                    key={name}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1.5">
                      <Logo className="h-full w-full" />
                    </div>

                    <span className="text-base font-semibold text-white sm:text-lg">
                      {name}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="flex items-center justify-center lg:justify-end">
            <img
              src={officeImage}
              alt="Steps Infotech Office"
              className="h-[250px] w-auto max-w-full object-contain sm:h-[290px] md:h-[330px] lg:h-[370px] xl:h-[400px]"
            />
          </div>
        </div>

        {/* BOTTOM INFORMATION */}
        <div className="hidden border-t border-white/10 py-4 lg:block">
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 border-r border-white/10 last:border-r-0"
                >
                  <Icon className="h-5 w-5 shrink-0 !text-brand-cyan" />

                  <div>
                    <p className="font-heading text-lg font-semibold !text-white">
                      {stat.number}
                    </p>

                    <p className="text-xs !text-white/70">
                      {stat.title} {stat.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipSection;