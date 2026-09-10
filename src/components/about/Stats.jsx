import {
  CalendarDays,
  Users,
  BriefcaseBusiness,
  UserRound,
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

export default function Stats() {
  return (
    <section className="mx-auto max-w-[1024px] px-[13px] pt-[17px]">

      <div className="flex h-[109px] items-center rounded-[27px] bg-[#a9f5f4] px-[8px] shadow-[0_7px_3px_rgba(0,0,0,0.3)]">

        {stats.map((item, index) => {

          const Icon = item.icon;

          return (
            <div
              key={item.text}
              className={`flex h-[52px] flex-1 items-center justify-center gap-[8px] ${
                index !== 4
                  ? "border-r border-[#4c8586]"
                  : ""
              }`}
            >

              <Icon
                size={34}
                strokeWidth={1.4}
                className="text-[#298d91]"
              />

              <div className="leading-none">

                <div className="text-[16px] font-normal text-[#075d68]">
                  {item.number}
                </div>

                <div className="mt-[7px] whitespace-nowrap text-[14px] font-medium">
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