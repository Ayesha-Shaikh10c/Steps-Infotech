import {
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  ThumbsUp,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: BriefcaseBusiness,
    value: "500+",
    label: "Internship Opportunities",
  },
  {
    icon: Users,
    value: "100+",
    label: "Industry Mentors",
  },
  {
    icon: Building2,
    value: "250+",
    label: "Company Partners",
  },
  {
    icon: GraduationCap,
    value: "15K+",
    label: "Students trained",
  },
  {
    icon: ThumbsUp,
    value: "98%",
    label: "Intern Satisfaction",
  },
];

function StatsBar() {
  return (
    <section className="bg-[#00484d] px-6 pb-9 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1200px] overflow-hidden rounded-[16px] bg-[#087b80] sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 border-b border-[#00585e] px-5 py-4 last:border-0 lg:border-b-0 lg:border-r"
            >
              <Icon
                size={17}
                className="text-[#04dbe2]"
              />

              <div>
                <p className="text-[20px] font-bold">
                  {stat.value}
                </p>

                <p className="text-[8px] leading-tight">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default StatsBar;