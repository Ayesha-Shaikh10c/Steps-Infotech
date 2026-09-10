import {
  CalendarDays,
  Users,
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

const stats = [
  {
    number: "10+",
    text: "years of excellence",
    icon: CalendarDays,
  },
  {
    number: "150+",
    text: "happy clients",
    icon: Users,
  },
  {
    number: "250+",
    text: "project delivered",
    icon: BriefcaseBusiness,
  },
  {
    number: "50+",
    text: "expert professionals",
    icon: Users,
  },
  {
    number: "10+",
    text: "industry served",
    icon: Building2,
  },
];

function Stats() {
  return (
    <section className="mx-auto w-full max-w-[1024px] px-[10px] pt-[17px]">

      <div
        className="
          grid grid-cols-2
          overflow-hidden
          rounded-[27px]
          bg-[#a9f5f4]
          px-[6px] py-[13px]
          shadow-[0_7px_3px_rgba(0,0,0,0.28)]
          md:grid-cols-5
        "
      >

        {stats.map((item, index) => {

          const Icon = item.icon;

          return (
            <div
              key={item.text}
              className={`
                flex min-h-[55px]
                items-center justify-center
                gap-[7px]
                px-[8px]
                ${
                  index !== stats.length - 1
                    ? "md:border-r md:border-[#4c8586]"
                    : ""
                }
              `}
            >

              <Icon
                size={31}
                strokeWidth={1.4}
                className="shrink-0 text-[#298d91]"
              />

              <div className="leading-none">

                <div className="text-[15px] font-normal text-[#075d68]">
                  {item.number}
                </div>

                <div className="mt-[6px] whitespace-nowrap text-[11px] font-medium text-black md:text-[12px]">
                  {item.text}
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default Stats;