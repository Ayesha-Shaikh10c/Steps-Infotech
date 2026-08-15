import {
  FaMagnifyingGlass,
  FaClipboardList,
  FaChartColumn,
  FaCode,
  FaCircleCheck,
  FaCloudArrowUp,
  FaHeadset,
} from "react-icons/fa6";

const STEPS = [
  {
    icon: FaMagnifyingGlass,
    title: "Discover",
    desc: "We understand your business and objectives.",
  },
  {
    icon: FaClipboardList,
    title: "Plan",
    desc: "We create a strategic plan tailored to your needs.",
  },
  {
    icon: FaChartColumn,
    title: "Analyze",
    desc: "We analyze data and requirements for the best approach.",
  },
  {
    icon: FaCode,
    title: "Develop",
    desc: "We build scalable and secure solutions.",
  },
  {
    icon: FaCircleCheck,
    title: "Test",
    desc: "We ensure quality through rigorous testing.",
  },
  {
    icon: FaCloudArrowUp,
    title: "Deploy",
    desc: "We deploy the solution seamlessly and efficiently.",
  },
  {
    icon: FaHeadset,
    title: "Support",
    desc: "We provide ongoing support and maintenance.",
  },
];

export default function SolutionProcess() {
  return (
    <section className="bg-brand-info font-body">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="text-center max-w-xl mx-auto mb-4">
          <span className="text-brand-teal font-semibold tracking-widest text-xs md:text-sm">
            OUR SOLUTION PROCESS
          </span>
          <h2 className="font-heading text-brand-navy text-2xl md:text-4xl mt-2">
            Your Success, Our Proven Process
          </h2>
        </div>
        <div className="w-16 h-0.5 bg-brand-teal mx-auto mb-12" />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-4">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative flex flex-col items-center text-center px-2">
              {/* connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-4 left-1/2 w-full h-px bg-brand-teal/30" />
              )}

              <span className="relative z-10 w-8 h-8 rounded-full bg-brand-teal text-white text-xs font-semibold flex items-center justify-center mb-4">
                {i + 1}
              </span>
              <div className="text-brand-navy text-2xl mb-3">
                <Icon />
              </div>
              <h3 className="font-heading text-brand-navy text-sm md:text-base mb-1">
                {title}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
