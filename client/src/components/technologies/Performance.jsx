import {
  FaLock,
  FaCloud,
  FaChartLine,
  FaHeadphones,
  FaMicrochip,
  FaUsers,
  FaCode,
  FaBolt,
} from "react-icons/fa6";

function Performance() {
  const features = [
    {
      icon: FaLock,
      title: "Secure Development",
      description:
        "Industry-standard security practices to protect your application and data.",
    },
    {
      icon: FaBolt,
      title: "High Performance",
      description:
        "Fast, optimized and scalable applications for the best performance.",
    },
    {
      icon: FaCloud,
      title: "Cloud Ready",
      description:
        "Deploy seamlessly on modern cloud platforms with flexibility and reliability.",
    },
    {
      icon: FaMicrochip,
      title: "AI Powered",
      description:
        "Integrate AI and Machine Learning to automate and accelerate your business.",
    },
    {
      icon: FaChartLine,
      title: "Scalable Architecture",
      description:
        "Solutions designed to scale effortlessly as your business grows.",
    },
    {
      icon: FaHeadphones,
      title: "Technical Support",
      description:
        "Maintenance, updates and long-term technical support whenever you need.",
    },
  ];

  const stats = [
    { icon: FaMicrochip, number: "120+", label: "Technologies" },
    { icon: FaCode, number: "50+", label: "Frameworks" },
    { icon: FaCloud, number: "10+", label: "Cloud Platforms" },
    { icon: FaUsers, number: "120+", label: "Expert Engineers" },
  ];

  return (
    <section className="w-full bg-[#f5f4f1] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-[90%] max-w-[1120px]">

        {/* ================= HEADING ================= */}
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold tracking-[1px] text-[#176466] sm:text-sm">
            WHY OUR TECH STACK
          </p>

          <h2 className="font-['Barlow_Condensed'] text-5xl leading-[0.9] font-bold text-[#151c27] sm:text-6xl lg:text-7xl">
            Built for Performance, Security & Scalability
          </h2>
        </div>

        {/* ================= FEATURES AREA ================= */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.8fr]">

          {/* NETWORK / TECHNOLOGY VISUAL */}
          <div className="relative min-h-[280px] overflow-hidden rounded-xl bg-[radial-gradient(circle_at_70%_30%,#a855f7_0%,transparent_18%),radial-gradient(circle_at_40%_70%,#155e75_0%,transparent_25%),linear-gradient(135deg,#111827,#2e1065)] p-6">
            
            {/* Decorative technology circles */}
            <div className="absolute top-[20%] left-[20%] h-32 w-32 rounded-full border border-white/20" />
            <div className="absolute top-[35%] right-[18%] h-20 w-20 rounded-full border border-cyan-300/30" />
            <div className="absolute bottom-[15%] left-[38%] h-24 w-24 rounded-full border border-purple-300/20" />

            {/* Connecting lines */}
            <div className="absolute top-[50%] left-[10%] h-px w-[80%] rotate-[25deg] bg-white/20" />
            <div className="absolute top-[45%] left-[15%] h-px w-[70%] -rotate-[30deg] bg-white/15" />

            {/* Center glow */}
            <div className="absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-2xl" />

            <div className="relative z-10 flex h-full items-center justify-center">
              <FaMicrochip className="text-6xl text-white/70" />
            </div>
          </div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex min-h-[95px] items-center gap-3 rounded-xl bg-white p-4 shadow-[0_8px_18px_rgba(0,0,0,0.14)] transition duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6f1f1] text-xl text-[#167476]">
                    <Icon />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#313842]">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-4 text-[#6c747b]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= STATISTICS ================= */}
        <div className="mt-8 grid grid-cols-2 gap-y-6 rounded-2xl bg-[#1b6466] px-4 py-6 text-white sm:grid-cols-4 sm:gap-y-0 sm:px-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`flex items-center justify-center gap-3 ${
                  index !== stats.length - 1
                    ? "sm:border-r sm:border-white/15"
                    : ""
                }`}
              >
                <Icon className="text-2xl sm:text-3xl" />

                <div>
                  <p className="text-xl font-bold">{stat.number}</p>
                  <p className="text-xs text-white/70">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= WHY CHOOSE ================= */}
        <div className="mt-8 grid overflow-hidden rounded-2xl bg-[#267b7c] text-white md:grid-cols-4">

          {/* Title */}
          <div className="flex flex-col justify-center p-6">
            <p className="text-sm text-white/60">Why choose</p>
            <h3 className="mt-2 text-sm font-bold tracking-wide">
              STEPS INFOTECH?
            </h3>
          </div>

          {/* Reasons */}
          <div className="border-t border-white/20 p-6 md:border-t-0 md:border-l">
            <h3 className="font-['Barlow_Condensed'] text-3xl font-bold">
              Expert Team
            </h3>
            <p className="mt-3 text-xs leading-5 text-white/75">
              Skilled professionals with deep industry knowledge.
            </p>
          </div>

          <div className="border-t border-white/20 p-6 md:border-t-0 md:border-l">
            <h3 className="font-['Barlow_Condensed'] text-3xl font-bold">
              Innovative Approach
            </h3>
            <p className="mt-3 text-xs leading-5 text-white/75">
              We use the latest technology to deliver innovative solutions.
            </p>
          </div>

          <div className="border-t border-white/20 p-6 md:border-t-0 md:border-l">
            <h3 className="font-['Barlow_Condensed'] text-3xl font-bold">
              Client-Centric
            </h3>
            <p className="mt-3 text-xs leading-5 text-white/75">
              Your success is our priority. We work as your technology partner.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Performance;