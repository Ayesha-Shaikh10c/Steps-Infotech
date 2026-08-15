import {
  FaBuilding,
  FaRocket,
  FaShieldHalved,
  FaChartLine,
  FaCloud,
  FaArrowRight,
} from "react-icons/fa6";

const SOLUTIONS = [
  {
    icon: FaBuilding,
    title: "Enterprise Solutions",
    desc: "End-to-end IT solutions to help enterprises streamline operations, improve efficiency and scale seamlessly.",
  },
  {
    icon: FaRocket,
    title: "Startup Solutions",
    desc: "Cost effective and scalable solutions to help startups build, grow and succeed faster.",
  },
  {
    icon: FaShieldHalved,
    title: "Cyber Security Solutions",
    desc: "Protect your business from digital threats with our advanced security solutions and proactive monitoring.",
  },
  {
    icon: FaChartLine,
    title: "Data & Analytics",
    desc: "Turn your data into actionable insights and make smarter business decisions.",
  },
  {
    icon: FaCloud,
    title: "Cloud Solutions",
    desc: "Leverage the power of cloud to reduce costs, increase agility and ensure business continuity.",
  },
];

export default function SolutionCards() {
  return (
    <section className="bg-white font-body">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-brand-teal font-semibold tracking-widest text-xs md:text-sm">
          WHAT WE SOLVE
        </span>
        <h2 className="font-heading text-brand-navy text-2xl md:text-4xl mt-2 mb-4">
          Solutions For Every Business Need
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          From startups to enterprises, we deliver scalable solutions that enhance
          efficiency, improve productivity and accelerate digital transformation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOLUTIONS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-lg bg-brand-info flex items-center justify-center text-brand-teal text-xl mb-4">
              <Icon />
            </div>
            <h3 className="font-heading text-brand-navy text-base md:text-lg mb-2">
              {title}
            </h3>
            <p className="text-gray-500 text-sm mb-4">{desc}</p>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-brand-teal text-sm font-semibold hover:gap-2 transition-all"
            >
              Learn More <FaArrowRight className="text-xs" />
            </a>
          </div>
        ))}

        {/* More Solutions CTA card */}
        <a
          href="#"
          className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 bg-brand-info text-brand-navy font-heading text-base md:text-lg"
        >
          More Solutions <FaArrowRight />
        </a>
      </div>
      </div>
    </section>
  );
}
