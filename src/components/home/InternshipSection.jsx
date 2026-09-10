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

import { useNavigate } from "react-router-dom";

import Button from "../button/button";
import officeImage from "../../assets/images/image1.png";

const InternshipSection = () => {
  const navigate = useNavigate();

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

  return (
    <section className="page-hero w-full overflow-hidden bg-brand-navy px-5 text-white sm:px-8 md:px-10 lg:px-12 xl:px-14 font-body">
      <div className="mx-auto flex h-full max-w-[1500px] flex-col justify-center">
        {/* HERO CONTENT */}
        <div className="grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] !text-brand-cyan sm:text-base">
              STEPS INFOTECH
            </p>

            <h1 className="font-heading text-[38px] font-bold leading-[1.12] tracking-tight !text-white sm:text-[45px] md:text-[52px] lg:text-[56px] xl:text-[62px]">
              <span className="!text-white">
                TOP IN-DEMAND
                <br />
                INTERNSHIP IN
              </span>
              <br />
              <span className="!text-brand-cyan">2026</span>
            </h1>

            <p className="mt-4 max-w-[600px] text-sm leading-6 !text-white/80 sm:text-base sm:leading-7">
              Build real-world experience, learn from industry experts, and
              accelerate your career with practical internship opportunities.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={() => navigate("/careers")}>
                Explore Internships
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex items-center justify-center lg:justify-end">
            <img
              src={officeImage}
              alt="Steps Infotech Office"
              className="h-[250px] w-auto max-w-full object-contain sm:h-[290px] md:h-[330px] lg:h-[370px] xl:h-[400px]"
            />
          </div>
        </div>

        {/* BOTTOM INFORMATION */}
        <div className="hidden border-t border-white/10 py-4 lg:block">
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 border-r border-white/10 last:border-r-0"
                >
                  <Icon className="h-5 w-5 shrink-0 !text-brand-cyan" />

                  <div>
                    <p className="font-heading text-lg font-semibold !text-white">
                      {stat.number}
                    </p>

                    <p className="text-xs !text-white/70">
                      {stat.title} {stat.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipSection;