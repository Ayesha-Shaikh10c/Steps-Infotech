import {
  BarChart3,
  Cloud,
  Code2,
  LockKeyhole,
  Palette,
  Smartphone,
} from "lucide-react";

const technologies = [
  {
    icon: Code2,
    title: "Web Development",
  },
  {
    icon: Smartphone,
    title: "App Development",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
  },
  {
    icon: LockKeyhole,
    title: "Cyber Security",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
  },
  {
    icon: BarChart3,
    title: "Data Science",
  },
];

function Technologies() {
  return (
    <section className="border-t border-white/10 bg-[#00484d] px-6 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-3">
        {technologies.map((item) => {
          const Icon = item.icon;

          return (
            <a
              href="/technologies"
              key={item.title}
              className="flex h-[52px] items-center gap-2 rounded-lg bg-[#dedede] px-5 text-[#111] transition hover:-translate-y-0.5 hover:bg-white"
            >
              <Icon size={14} />

              <span className="text-[12px] font-semibold">
                {item.title}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default Technologies;