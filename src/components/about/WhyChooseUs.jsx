import {
  Lightbulb,
  Headphones,
  ChartNoAxesCombined,
  ArrowRight,
} from "lucide-react";

const reasons = [
  {
    title: "Innovative Solutions",
    text: "We leverage the latest technologies and creative thinking to build future-ready solutions.",
    icon: Lightbulb,
  },
  {
    title: "Dedicated Support",
    text: "Our support team is always available to ensure smooth operations and client satisfaction.",
    icon: Headphones,
  },
  {
    title: "Results - Driven",
    text: "We focus on delivering measurable outcomes that help businesses grow and succeed.",
    icon: ChartNoAxesCombined,
  },
];

function WhyChooseUs() {
  return (
    <section className="w-full bg-white px-4 pb-16 pt-4 md:px-8 md:pb-20">

      <div className="mx-auto max-w-[1024px]">

        {/* SECTION HEADING */}
        <div className="text-center">
          <p className="text-[14px] font-bold tracking-[3px] text-[#269497]">
            WHY CHOOSE US
          </p>

          <h2 className="mt-2 text-[28px] font-extrabold text-[#173b4d] md:text-[32px]">
            What Sets Us Apart
          </h2>

          <div className="mx-auto mt-4 h-[3px] w-[65px] rounded-full bg-[#269497]" />
        </div>

        {/* CARDS */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">

          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="
                  group
                  rounded-[24px]
                  border border-[#d9eeee]
                  bg-white
                  px-7 py-7
                  shadow-[0_6px_18px_rgba(0,0,0,0.10)]
                  transition duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_14px_28px_rgba(0,0,0,0.15)]
                "
              >

                {/* ICON */}
                <div
                  className="
                    flex h-[60px] w-[60px]
                    items-center justify-center
                    rounded-2xl
                    bg-[#a9f5f4]
                    transition duration-300
                    group-hover:bg-[#238e91]
                  "
                >
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                    className="text-[#238e91] transition duration-300 group-hover:text-white"
                  />
                </div>

                {/* TITLE */}
                <h3 className="mt-6 text-[19px] font-bold text-[#173b4d]">
                  {reason.title}
                </h3>

                {/* LINE */}
                <div className="mt-3 h-[3px] w-[45px] rounded-full bg-[#269497]" />

                {/* DESCRIPTION */}
                <p className="mt-5 text-[14px] font-medium leading-[1.7] text-[#334b57]">
                  {reason.text}
                </p>

                {/* ARROW */}
                <div className="mt-6 flex items-center gap-2 text-[13px] font-bold text-[#238e91]">
                  Learn more
                  <ArrowRight
                    size={17}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>

              </div>
            );
          })}
          

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;