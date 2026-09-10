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
    <section className="min-h-screen w-full overflow-hidden bg-[#003942] px-5 py-10 text-white sm:px-8 md:px-10 lg:px-12 xl:px-14 lg:py-14">
      <div className="mx-auto max-w-[1450px]">

        {/* ================= MAIN GRID ================= */}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">

          {/* ================= LEFT SIDE ================= */}

          <div className="flex flex-col">

            {/* Heading */}

            <h1 className="text-[48px] font-bold leading-[1.05] tracking-tight sm:text-[55px] md:text-[62px] lg:text-[66px] xl:text-[76px]">
          <span className="text-white">
          TOP  IN-DEMAND  INTERNSHIP IN
  </span>

  <br />

  <span className="text-[#12dce8]">
    2026
  </span>
</h1>

            {/* Description */}

            <p className="mt-6 max-w-[650px] text-lg leading-[1.55] text-white sm:text-xl md:text-2xl">
              Join hands with Steps Infotech for the latest
              internship opportunities and tech career
              updates.
            </p>

            {/* ================= BUTTONS ================= */}

            <div className="mt-7 flex flex-wrap gap-6">

              {/* Explore Internships */}

              <button className="flex items-center gap-2 rounded-2xl bg-[#12cbd8] px-5 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#0eb7c4] sm:px-6 sm:text-lg md:text-xl">
                <BriefcaseBusiness size={25} />

                <span>
                  Explore Internships
                </span>

                <ArrowRight size={21} />
              </button>

              {/* Learn More */}

              <button className="flex items-center gap-2 rounded-2xl bg-[#002731] px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#003640] sm:px-8 sm:text-lg md:text-xl">
                <span>
                  Learn More
                </span>

                <ArrowRight size={21} />
              </button>

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

          {/* ================= RIGHT SIDE ================= */}

          <div className="flex flex-col">

            {/* IMAGE */}

            <div className="group w-full overflow-hidden rounded-[30px]">

              <img
                src="image1.png"
                alt="Steps Infotech Office"
                className="h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[470px] md:h-[550px] lg:h-[625px]"
              />

            </div>

            {/* Description */}

            <div className="mt-7">

              <p className="text-lg leading-[1.55] text-white sm:text-xl lg:text-[22px] xl:text-[23px]">
                At Steps Infotech, we bridge the gap between
                talent and opportunity. Our internships are
                designed to help you learn, build, and grow
                with real-world exposure and industry
                mentorship.
              </p>

              {/* Quote */}

              <div className="mt-7 flex items-center gap-4">

                <Quote
                  size={38}
                  fill="currentColor"
                  strokeWidth={0}
                  className="shrink-0 text-[#12dce8]"
                />

                <p className="text-xl font-medium italic text-[#12dce8] sm:text-2xl">
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