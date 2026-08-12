import {
  Award,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  GraduationCap,
  Handshake,
  Users,
} from "lucide-react";

const highlights = [
  {
    icon: CalendarDays,
    title: "3–6 Month Internship",
    text: "Flexible durations to match your goal",
  },
  {
    icon: BriefcaseBusiness,
    title: "Live Client Projects",
    text: "Work on real-projects & gain experience",
  },
  {
    icon: Users,
    title: "Weekly Mentor Sessions",
    text: "Learn and grow with expert guidance",
  },
  {
    icon: GraduationCap,
    title: "Certificate of Completion",
    text: "Earn a recognized internship certificate",
  },
  {
    icon: FileText,
    title: "Resume & Interview Support",
    text: "Get expert help to build your career",
  },
  {
    icon: Handshake,
    title: "Job Referral Opportunities",
    text: "Get noticed by top hiring partners",
  },
];

const features = [
  {
    icon: BriefcaseBusiness,
    title: "Hands-on Experience",
    text: "Work on real Projects and live Tasks",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    text: "Learn From Industry Professionals",
  },
  {
    icon: Award,
    title: "Certification Program",
    text: "Earn Recognized Certifications",
  },
  {
    icon: BarChart3,
    title: "Career Growth",
    text: "Better skills, Better opportunities",
  },
];

function InternshipSection() {
  return (
    <section className="bg-[#00484d] px-6 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_310px]">
        
        {/* LEFT */}
        <div className="flex flex-col justify-center">
          <span className="w-fit rounded-md bg-[#08777b] px-3 py-1.5 text-[9px] font-semibold">
            🎓 Learn. Build. Grow.
          </span>

          <h2 className="mt-4 text-[34px] font-bold leading-[1.15] sm:text-[40px]">
            From Learning
            <br />
            to Earning –
            <br />
            <span className="text-[#08d5dc]">
              We Guide You
            </span>
          </h2>

          <p className="mt-3 max-w-[430px] text-[10px] leading-[1.4] text-white/80">
            Join industry-focused internships and gain real-world
            experience. Build your skills, boost confidence and unlock
            better opportunities.
          </p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="border-r border-white/30 px-3 first:pl-0 last:border-0"
                >
                  <Icon
                    size={19}
                    className="text-[#08d5dc]"
                  />

                  <h3 className="mt-2 text-[11px] font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-[8px] leading-[1.3] text-white/70">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="rounded-[18px] bg-[#087277] p-5">
          <h3 className="text-[19px] font-bold">
            Internship
            <br />
            <span className="text-[#08d5dc]">
              Program Highlights
            </span>
          </h3>

          <div className="mt-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-2 border-b border-white/30 py-2 last:border-0"
                >
                  <Icon
                    size={14}
                    className="mt-0.5 shrink-0 text-[#08d5dc]"
                  />

                  <div>
                    <p className="text-[10px] font-semibold">
                      {item.title}
                    </p>

                    <p className="text-[7px] text-white/70">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <a
            href="/internships"
            className="mt-3 flex items-center justify-center rounded-md bg-[#08d5dc] py-2 text-[9px] font-bold text-white"
          >
            Apply Now →
          </a>
        </div>
      </div>
    </section>
  );
}

export default InternshipSection;